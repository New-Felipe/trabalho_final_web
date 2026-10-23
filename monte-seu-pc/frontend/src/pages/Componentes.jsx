import { useState } from "react";
import { Cpu, Package, Tag } from "lucide-react";
import Header from "../components/Header";
import componentes from "../data/componentes.json";

const categorias = [
  "Todos",
  "Processadores",
  "Placas-mãe",
  "Placas de Vídeo",
  "Memória RAM",
  "Armazenamento",
  "Fontes de Alimentação",
];

function ProdutoCard({ produto }) {
  const precoFormatado = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-graphite p-5 transition-colors hover:border-brand">
      {/* Área visual do produto */}
      <div className="mb-5 flex h-36 items-center justify-center rounded-lg bg-ink">
        <Cpu
          size={54}
          className="text-brand"
          aria-hidden="true"
        />
      </div>

      {/* Marca */}
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-brand">
        <Tag size={14} aria-hidden="true" />
        {produto.marca}
      </div>

      {/* Nome */}
      <h3 className="text-lg font-bold text-white">
        {produto.nome}
      </h3>

      {/* Categoria */}
      <p className="mt-2 text-xs text-muted">
        {produto.categoria}
      </p>

      {/* Descrição */}
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {produto.descricao}
      </p>

      {/* Preço */}
      <div className="mt-6 border-t border-line pt-4">
        <p className="text-xs text-muted">
          Preço ilustrativo
        </p>

        <p className="mt-1 text-2xl font-extrabold text-brand">
          {precoFormatado}
        </p>
      </div>
    </article>
  );
}

export default function Componentes() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const produtosFiltrados = componentes.filter((produto) => {
    return (
      categoriaAtiva === "Todos" ||
      produto.categoria === categoriaAtiva
    );
  });

  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Título */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Explore os{" "}
            <span className="text-brand">
              Componentes
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-muted">
            Conheça diferentes peças de hardware e explore
            as categorias disponíveis para planejar seu PC.
          </p>
        </header>

        {/* Filtros */}
        <section aria-label="Filtros de categoria">
          <div className="flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaAtiva(categoria)}
                aria-pressed={categoriaAtiva === categoria}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  categoriaAtiva === categoria
                    ? "border-brand bg-brand text-ink"
                    : "border-line bg-graphite text-white hover:border-brand"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </section>

        {/* Catálogo */}
        <section className="mt-12" aria-live="polite">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold">
              {categoriaAtiva === "Todos"
                ? "Todos os componentes"
                : categoriaAtiva}
            </h2>

            <div className="flex items-center gap-2 text-sm text-muted">
              <Package size={16} aria-hidden="true" />

              {produtosFiltrados.length}{" "}
              {produtosFiltrados.length === 1
                ? "produto"
                : "produtos"}
            </div>
          </div>

          {produtosFiltrados.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produtosFiltrados.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  produto={produto}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-graphite p-10 text-center">
              <Package
                size={40}
                className="mx-auto mb-4 text-muted"
                aria-hidden="true"
              />

              <p className="text-muted">
                Nenhum componente encontrado nesta categoria.
              </p>
            </div>
          )}
        </section>

        {/* Aviso sobre os dados */}
        <p className="mt-10 text-center text-xs text-muted">
          Catálogo demonstrativo com preços ilustrativos.
          Não representa ofertas ou disponibilidade em tempo real.
        </p>
      </main>
    </div>
  );
}
