import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";


import api from "../services/api";

export default function MinhasMontagens() {

    const [montagens, setMontagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [montagemParaExcluir, setMontagemParaExcluir] = useState(null);
    const [excluindo, setExcluindo] = useState(false);
    const [erroExclusao, setErroExclusao] = useState("");
    const [montagemParaEditar, setMontagemParaEditar] = useState(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [componentesEditados, setComponentesEditados] = useState([]);
    const [salvandoEdicao, setSalvandoEdicao] = useState(false);
    const [erroEdicao, setErroEdicao] = useState("");
    const [catalogoComponentes, setCatalogoComponentes] = useState([]);


    useEffect(() => {
        let ativo = true;

        async function carregarMontagens() {
            try {
                const resposta = await api.get("/montagens");

                if (ativo) {
                    setMontagens(
                        Array.isArray(resposta.data) ? resposta.data : []
                    );
                    setErro("");
                }
            } catch (error) {
                console.error("Erro ao carregar montagens:", error);

                if (ativo) {
                    setErro("Não foi possível carregar suas montagens.");
                }
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarMontagens();

        return () => {
            ativo = false;
        };
    }, []);

    useEffect(() => {
        let ativo = true;

        async function carregarCatalogo() {
            try {
                const resposta = await api.get("/components");

                if (ativo) {
                    setCatalogoComponentes(
                        Array.isArray(resposta.data) ? resposta.data : []
                    );
                }
            } catch (error) {
                console.error("Erro ao carregar catálogo:", error);
            }
        }

        carregarCatalogo();

        return () => {
            ativo = false;
        };
    }, []);

    function obterComponentesDetalhados(montagem) {
        if (!Array.isArray(montagem.componentes)) {
            return [];
        }

        return montagem.componentes.map((componente) => {
            const id =
                typeof componente === "string"
                    ? componente
                    : componente?._id;

            const componenteCatalogo = catalogoComponentes.find(
                (item) => String(item._id) === String(id)
            );

            return (
                componenteCatalogo ||
                (typeof componente === "object" && componente !== null
                    ? componente
                    : { _id: id })
            );
        });
    }

    function calcularTotalMontagem(montagem) {
        const componentes = obterComponentesDetalhados(montagem);

        if (componentes.length === 0) {
            return null;
        }

        const precosValidos = componentes.every(
            (componente) =>
                componente.preco !== undefined &&
                componente.preco !== null &&
                componente.preco !== "" &&
                Number.isFinite(Number(componente.preco)) &&
                Number(componente.preco) >= 0
        );

        if (!precosValidos) {
            return null;
        }

        return componentes.reduce(
            (total, componente) => total + Number(componente.preco),
            0
        );
    }

    async function excluirMontagem() {
        if (!montagemParaExcluir?._id || excluindo) {
            return;
        }

        const montagemId = montagemParaExcluir._id;

        setErroExclusao("");
        setExcluindo(true);

        try {
            await api.delete(`/montagens/${montagemId}`);

            setMontagens((atuais) =>
                atuais.filter((montagem) => montagem._id !== montagemId)
            );

            setMontagemParaExcluir(null);
        } catch (error) {
            console.error("Erro ao excluir montagem:", error);

            setErroExclusao(
                error.response?.data?.message ||
                "Não foi possível excluir a montagem. Tente novamente."
            );
        } finally {
            setExcluindo(false);
        }
    }

    async function salvarEdicao() {
        const nome = nomeEditado.trim();

        if (!nome) {
            setErroEdicao("Informe um nome para a montagem.");
            return;
        }

        if (!montagemParaEditar?._id || salvandoEdicao) {
            return;
        }

        const montagemId = montagemParaEditar._id;

        const componentes = componentesEditados;

        if (componentes.length === 0) {
            setErroEdicao("Selecione pelo menos um componente.");
            return;
        }

        setErroEdicao("");
        setSalvandoEdicao(true);

        try {
            await api.put(`/montagens/${montagemId}`, {
                nome,
                componentes,
            });

            setMontagens((atuais) =>
                atuais.map((montagem) =>
                    montagem._id === montagemId
                        ? {
                            ...montagem,
                            nome,
                            componentes,
                        }
                        : montagem
                )
            );

            setMontagemParaEditar(null);
        } catch (error) {
            console.error("Erro ao atualizar montagem:", error);

            setErroEdicao(
                error.response?.data?.message ||
                "Não foi possível atualizar a montagem."
            );
        } finally {
            setSalvandoEdicao(false);
        }
    }

    return (
        <div className="min-h-screen bg-ink text-white">
            <Header />

            <main className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold text-brand">
                    Minhas Montagens
                </h1>

                <p className="mt-3 text-muted">
                    Consulte e gerencie suas configurações de computador.
                </p>

                <section className="mt-10">
                    {carregando ? (
                        <p role="status" className="text-muted">
                            Carregando suas montagens...
                        </p>
                    ) : erro ? (
                        <div
                            role="alert"
                            className="rounded-xl border border-red-500/30 bg-graphite p-6"
                        >
                            <p className="text-red-400">{erro}</p>

                            <p className="mt-3 text-sm text-muted">
                                Você ainda pode escolher os componentes do seu PC.
                                O salvamento ficará disponível quando o serviço
                                de montagens estiver funcionando.
                            </p>

                            <Link
                                to="/montar-pc"
                                className="mt-5 inline-flex rounded-lg bg-brand px-5 py-3 font-semibold text-ink transition hover:bg-brand-hover"
                            >
                                Voltar ao montador
                            </Link>

                        </div>
                    ) : montagens.length === 0 ? (
                        <div className="rounded-xl border border-line bg-graphite p-8 text-center">
                            <h2 className="text-xl font-semibold">
                                Você ainda não possui montagens salvas.
                            </h2>

                            <p className="mt-3 text-sm text-muted">
                                Comece selecionando os componentes do seu próximo PC.
                            </p>

                            <Link
                                to="/montar-pc"
                                className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 font-semibold text-ink transition hover:bg-brand-hover"
                            >
                                Montar meu PC
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {montagens.map((montagem) => (
                                <article
                                    key={montagem._id}
                                    className="rounded-xl border border-line bg-graphite p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-lg hover:shadow-brand/10"
                                >
                                    <h2 className="text-xl font-bold text-white">
                                        {montagem.nome}
                                    </h2>

                                    <p className="mt-3 text-sm text-muted">
                                        {Array.isArray(montagem.componentes)
                                            ? montagem.componentes.length
                                            : 0}{" "}
                                        componente(s) selecionado(s)
                                    </p>

                                    <div className="mt-5">
                                        <p className="text-xs text-muted">
                                            Valor total estimado
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-brand">
                                            {calcularTotalMontagem(montagem) !== null
                                                ? calcularTotalMontagem(montagem).toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                )
                                                : "Valor indisponível"}
                                        </p>

                                        <p className="mt-1 text-xs text-muted">
                                            Preços demonstrativos
                                        </p>
                                    </div>

                                    <div className="mt-5 border-t border-line pt-4">
                                        <p className="text-xs text-muted">
                                            Configuração salva
                                        </p>
                                    </div>

                                    <details className="mt-4">
                                        <summary className="cursor-pointer rounded-lg border border-line px-4 py-3 text-center text-sm font-semibold text-brand transition hover:border-brand/60">
                                            Ver componentes
                                        </summary>

                                        <div className="mt-4 space-y-3 border-t border-line pt-4">
                                            {Array.isArray(montagem.componentes) &&
                                                montagem.componentes.length > 0 ? (
                                                obterComponentesDetalhados(montagem).map((componente, indice) => (

                                                    <div key={componente?._id || indice}>
                                                        <p className="text-sm text-white">
                                                            {componente?.nome ||
                                                                "Componente cadastrado — detalhes indisponíveis"}
                                                        </p>

                                                        {componente?.categoria && (
                                                            <p className="text-xs text-muted">
                                                                {componente.categoria}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-muted">
                                                    Nenhum componente associado.
                                                </p>
                                            )}
                                        </div>
                                    </details>

                                    <button
                                        type="button"

                                        onClick={() => {
                                            setMontagemParaEditar(montagem);
                                            setNomeEditado(montagem.nome || "");

                                            setComponentesEditados(
                                                Array.isArray(montagem.componentes)
                                                    ? montagem.componentes
                                                        .map((componente) =>
                                                            typeof componente === "string"
                                                                ? componente
                                                                : componente?._id
                                                        )
                                                        .filter(Boolean)
                                                    : []
                                            );

                                            setErroEdicao("");
                                        }}
                                        className="mt-4 w-full rounded-lg border border-brand/50 px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/10"
                                    >
                                        Editar montagem
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setErroExclusao("");
                                            setMontagemParaExcluir(montagem);
                                        }}
                                        className="mt-4 w-full rounded-lg border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500 hover:bg-red-500/10"
                                    >
                                        Excluir montagem
                                    </button>

                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {montagemParaExcluir && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="titulo-exclusao"
                            className="w-full max-w-md rounded-2xl border border-line bg-graphite p-6 shadow-2xl"
                        >
                            <h2
                                id="titulo-exclusao"
                                className="text-xl font-bold text-white"
                            >
                                Excluir montagem?
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-muted">
                                Você deseja excluir a montagem{" "}
                                <strong className="text-white">
                                    {montagemParaExcluir.nome}
                                </strong>
                                ? Essa ação não poderá ser desfeita.
                            </p>

                            {erroExclusao && (
                                <p role="alert" className="mt-4 text-sm text-red-400">
                                    {erroExclusao}
                                </p>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMontagemParaExcluir(null)}
                                    disabled={excluindo}
                                    className="rounded-lg border border-line px-4 py-2 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={excluirMontagem}
                                    disabled={excluindo}
                                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {excluindo ? "Excluindo..." : "Confirmar exclusão"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {montagemParaEditar && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="titulo-edicao"
                            className="w-full max-w-md rounded-2xl border border-line bg-graphite p-6 shadow-2xl"
                        >
                            <h2
                                id="titulo-edicao"
                                className="text-xl font-bold text-brand"
                            >
                                Editar montagem
                            </h2>

                            <p className="mt-3 text-sm text-muted">
                                Atualize o nome da sua configuração.
                            </p>

                            <div className="mt-6">
                                <label
                                    htmlFor="nomeEditado"
                                    className="mb-2 block text-sm font-semibold text-white"
                                >
                                    Nome da montagem
                                </label>

                                <input
                                    id="nomeEditado"
                                    type="text"
                                    value={nomeEditado}
                                    onChange={(evento) => setNomeEditado(evento.target.value)}
                                    maxLength={80}
                                    className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-white focus:border-brand focus:outline-none"
                                />
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-3 font-semibold text-white">
                                    Componentes da montagem
                                </h3>

                                <div className="max-h-64 space-y-4 overflow-y-auto pr-2">
                                    {[
                                        "Processadores",
                                        "Placas-mãe",
                                        "Memória RAM",
                                        "Placas de Vídeo",
                                        "Armazenamento",
                                        "Fontes de Alimentação",
                                    ].map((categoria) => {
                                        const disponiveis = catalogoComponentes.filter(
                                            (componente) => componente.categoria === categoria
                                        );

                                        const selecionado = componentesEditados.find((id) =>
                                            disponiveis.some(
                                                (componente) => String(componente._id) === String(id)
                                            )
                                        );

                                        return (
                                            <div key={categoria}>
                                                <label className="mb-2 block text-sm text-muted">
                                                    {categoria}
                                                </label>

                                                <select
                                                    value={selecionado || ""}
                                                    onChange={(evento) => {
                                                        const novoId = evento.target.value;

                                                        setComponentesEditados((atuais) => {
                                                            const outros = atuais.filter(
                                                                (id) =>
                                                                    !disponiveis.some(
                                                                        (componente) =>
                                                                            String(componente._id) === String(id)
                                                                    )
                                                            );

                                                            return novoId ? [...outros, novoId] : outros;
                                                        });
                                                    }}
                                                    disabled={disponiveis.length === 0}
                                                    className="w-full rounded-lg border border-line bg-ink px-3 py-3 text-sm text-white focus:border-brand focus:outline-none disabled:opacity-50"
                                                >
                                                    <option value="">Nenhum componente</option>

                                                    {disponiveis.map((componente) => (
                                                        <option
                                                            key={componente._id}
                                                            value={componente._id}
                                                        >
                                                            {componente.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {erroEdicao && (
                                <p role="alert" className="mt-4 text-sm text-red-400">
                                    {erroEdicao}
                                </p>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMontagemParaEditar(null);
                                        setErroEdicao("");
                                    }}
                                    disabled={salvandoEdicao}
                                    className="rounded-lg border border-line px-4 py-2 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={salvarEdicao}
                                    disabled={salvandoEdicao}
                                    className="rounded-lg bg-brand px-4 py-2 font-semibold text-ink transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {salvandoEdicao ? "Salvando..." : "Salvar alterações"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
