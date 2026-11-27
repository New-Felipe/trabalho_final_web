import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MontarPC() {

    const [componentes, setComponentes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [categoriaAtiva, setCategoriaAtiva] = useState("Processadores");
    const [salvando, setSalvando] = useState(false);
    const [erroSalvamento, setErroSalvamento] = useState("");
    const [sucessoSalvamento, setSucessoSalvamento] = useState("");
    const navigate = useNavigate();

    const [dadosMontagemPendente] = useState(() => {
        try {
            const dadosSalvos = sessionStorage.getItem("montagemPendente");

            return dadosSalvos ? JSON.parse(dadosSalvos) : null;
        } catch (error) {
            console.error("Erro ao ler montagem pendente:", error);
            return null;
        }
    });

    const [selecionados, setSelecionados] = useState(() =>
        dadosMontagemPendente?.selecionados &&
            typeof dadosMontagemPendente.selecionados === "object" &&
            !Array.isArray(dadosMontagemPendente.selecionados)
            ? dadosMontagemPendente.selecionados
            : {}
    );

    const [nomeMontagem, setNomeMontagem] = useState(() =>
        typeof dadosMontagemPendente?.nome === "string"
            ? dadosMontagemPendente.nome
            : ""
    );

    useEffect(() => {
        sessionStorage.removeItem("montagemPendente");
    }, []);

    useEffect(() => {
        let ativo = true;

        async function carregarComponentes() {
            try {
                const resposta = await api.get("/components");

                if (ativo) {
                    setComponentes(
                        Array.isArray(resposta.data) ? resposta.data : []
                    );
                    setErro("");
                }
            } catch (error) {
                console.error("Erro ao carregar componentes:", error);

                if (ativo) {
                    setErro("Não foi possível carregar os componentes.");
                }
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarComponentes();

        return () => {
            ativo = false;
        };
    }, []);

    function alternarSelecao(componente) {
        setSelecionados((atuais) => {
            const proximos = { ...atuais };
            const categoria = componente.categoria;

            if (proximos[categoria]?._id === componente._id) {
                delete proximos[categoria];
            } else {
                proximos[categoria] = componente;
            }

            return proximos;
        });
    }

    const pecasSelecionadas = Object.values(selecionados);

    const totalEtapas = 6;

    const etapasConcluidas = pecasSelecionadas.length;

    const progressoMontagem = Math.round(
        (etapasConcluidas / totalEtapas) * 100
    );

    const valorTotal = pecasSelecionadas.reduce(
        (soma, componente) => soma + Number(componente.preco),
        0
    );

    const componentesFiltrados = componentes.filter(
        (componente) => componente.categoria === categoriaAtiva
    );

    function validarMontagem() {
        if (!nomeMontagem.trim()) {
            return "Informe um nome para a montagem.";
        }

        if (pecasSelecionadas.length === 0) {
            return "Selecione pelo menos um componente.";
        }

        return "";
    }

    async function salvarMontagem() {
        setErroSalvamento("");
        setSucessoSalvamento("");

        const mensagemErro = validarMontagem();

        if (mensagemErro) {
            setErroSalvamento(mensagemErro);
            return;
        }

        if (!localStorage.getItem("token")) {
            sessionStorage.setItem(
                "montagemPendente",
                JSON.stringify({
                    nome: nomeMontagem,
                    selecionados,
                })
            );

            navigate("/login");
            return;
        }

        setSalvando(true);

        try {
            await api.post("/montagens", {
                nome: nomeMontagem.trim(),
                componentes: pecasSelecionadas.map((componente) => componente._id),
            });

            setSucessoSalvamento("Montagem salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar montagem:", error);

            setErroSalvamento(
                error.response?.data?.message ||
                "Não foi possível salvar a montagem. Verifique a conexão com a API."
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="min-h-screen bg-ink text-white">
            <Header />

            <main className="mx-auto max-w-[1309px] px-6 py-12 xl:px-12">
                <h1 className="text-3xl font-bold text-brand">
                    Montar meu PC
                </h1>

                <p className="mt-3 text-muted">
                    Escolha os componentes e personalize sua montagem.
                </p>

                <div className="mt-6 max-w-lg">
                    <label
                        htmlFor="nomeMontagem"
                        className="mb-2 block text-sm font-semibold text-white"
                    >
                        Nome da montagem
                    </label>

                    <input
                        id="nomeMontagem"
                        type="text"
                        value={nomeMontagem}
                        onChange={(evento) => setNomeMontagem(evento.target.value)}
                        placeholder="Ex.: Meu Setup Gamer"
                        maxLength={80}
                        className="w-full rounded-lg border border-line bg-graphite px-4 py-3 text-white placeholder:text-muted focus:border-brand focus:outline-none"
                    />

                    <p className="mt-2 text-xs text-muted">
                        Escolha um nome para identificar sua configuração.
                    </p>
                </div>

                <section className="mt-8 rounded-xl border border-line bg-graphite p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="font-semibold text-white">
                                Progresso da montagem
                            </h2>

                            <p className="mt-1 text-sm text-muted">
                                {etapasConcluidas} de {totalEtapas} categorias preenchidas
                            </p>
                        </div>

                        <span className="text-xl font-bold text-brand">
                            {progressoMontagem}%
                        </span>
                    </div>

                    <div
                        className="mt-4 h-3 overflow-hidden rounded-full bg-ink"
                        role="progressbar"
                        aria-label="Progresso da seleção de componentes"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progressoMontagem}
                    >
                        <div
                            className="h-full rounded-full bg-brand transition-all duration-300"
                            style={{ width: `${progressoMontagem}%` }}
                        />
                    </div>
                </section>

                <div className="mt-10 grid gap-6 xl:grid-cols-[285px_minmax(0,1fr)_285px] xl:items-start">

                    <aside className="rounded-xl border border-line bg-graphite p-5">
                        <h2 className="mb-5 text-lg font-semibold text-brand">
                            Etapas da montagem
                        </h2>

                        <ol className="space-y-2">
                            {[
                                "Processadores",
                                "Placas-mãe",
                                "Memória RAM",
                                "Placas de Vídeo",
                                "Armazenamento",
                                "Fontes de Alimentação",
                            ].map((categoria, indice) => (
                                <li key={categoria}>
                                    <button
                                        type="button"
                                        onClick={() => setCategoriaAtiva(categoria)}
                                        aria-current={
                                            categoriaAtiva === categoria ? "step" : undefined
                                        }
                                        className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition ${categoriaAtiva === categoria
                                            ? "bg-brand/15 text-brand"
                                            : "bg-[#1b1b20] text-white hover:bg-[#2a292f]"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${selecionados[categoria]
                                                ? "bg-green-600 text-white"
                                                : categoriaAtiva === categoria
                                                    ? "bg-brand text-ink"
                                                    : "bg-ink text-muted"
                                                }`}
                                        >
                                            {selecionados[categoria] ? "✓" : indice + 1}
                                        </span>

                                        <span className="font-medium">
                                            {categoria}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </aside>

                    <section className="min-w-0">
                        <h2 className="mb-6 text-2xl font-semibold">
                            Componentes disponíveis
                        </h2>

                        {carregando ? (
                            <p className="text-muted">Carregando componentes...</p>
                        ) : erro ? (
                            <p role="alert" className="text-red-400">
                                {erro}
                            </p>
                        ) : componentesFiltrados.length === 0 ? (
                            <p className="text-muted">
                                Nenhum componente disponível nesta categoria.
                            </p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {componentesFiltrados.map((componente) => (

                                    <article
                                        key={componente._id}
                                        className={`group rounded-xl border bg-graphite p-5
                                            transition-all duration-200
                                            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10
                                            ${selecionados[componente.categoria]?._id === componente._id
                                                ? "border-green-500/70 ring-1 ring-green-500/30"
                                                : "border-line hover:border-brand/60"
                                            }`}
                                    >

                                        <p className="text-sm text-muted">
                                            {componente.categoria}
                                        </p>

                                        <h3 className="mt-2 font-semibold">
                                            {componente.nome}
                                        </h3>

                                        <p className="mt-2 text-sm text-muted">
                                            {componente.marca}
                                        </p>

                                        {componente.descricao && (
                                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                                                {componente.descricao}
                                            </p>
                                        )}

                                        <p className="mt-4 font-bold text-brand">
                                            {Number(componente.preco).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => alternarSelecao(componente)}
                                            aria-pressed={
                                                selecionados[componente.categoria]?._id === componente._id
                                            }
                                            className={`mt-5 w-full rounded-lg px-4 py-2 font-semibold transition ${selecionados[componente.categoria]?._id === componente._id
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-brand text-ink hover:opacity-90"
                                                }`}
                                        >
                                            {selecionados[componente.categoria]?._id === componente._id
                                                ? "Selecionado ✓"
                                                : "Selecionar componente"}
                                        </button>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="min-w-0 rounded-xl border border-line bg-graphite p-6">
                        <h2 className="text-2xl font-semibold text-brand">
                            Resumo da montagem
                        </h2>

                        {pecasSelecionadas.length === 0 ? (
                            <p className="mt-4 text-muted">
                                Nenhum componente selecionado ainda.
                            </p>
                        ) : (
                            <div className="mt-6 space-y-4">
                                {pecasSelecionadas.map((componente) => (
                                    <div
                                        key={componente._id}
                                        className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
                                    >
                                        <div>
                                            <p className="text-sm text-muted">
                                                {componente.categoria}
                                            </p>
                                            <p className="font-semibold">
                                                {componente.nome}
                                            </p>
                                        </div>

                                        <p className="font-semibold">
                                            {Number(componente.preco).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                            <span className="text-lg font-semibold">
                                Total estimado
                            </span>

                            <span className="text-2xl font-bold text-brand">
                                {valorTotal.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                        </div>

                        <p className="mt-3 text-sm text-muted">
                            Os preços apresentados são demonstrativos.
                        </p>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={salvarMontagem}
                                disabled={salvando}
                                className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-ink transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {salvando ? "Salvando montagem..." : "Salvar montagem"}
                            </button>

                            {erroSalvamento && (
                                <p role="alert" className="mt-3 text-sm text-red-400">
                                    {erroSalvamento}
                                </p>
                            )}

                            {sucessoSalvamento && (
                                <p role="status" className="mt-3 text-sm text-green-400">
                                    {sucessoSalvamento}
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}