import { Link } from "react-router-dom";
import {
  Cpu,
  CircuitBoard,
  Monitor,
  MemoryStick,
  HardDrive,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Processadores", icon: Cpu },
  { name: "Placas-mãe", icon: CircuitBoard },
  { name: "Placas de Vídeo", icon: Monitor },
  { name: "Memória RAM", icon: MemoryStick },
  { name: "Armazenamento", icon: HardDrive },
  { name: "Fontes de Alimentação", icon: Zap },
];

export default function CategoriesSection() {
  return (
    <section
      className="bg-graphite py-16 lg:py-20"
      aria-labelledby="categories-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2
            id="categories-title"
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Explore os{" "}
            <span className="text-brand">
              Componentes
            </span>
          </h2>

          <p className="mt-4 text-muted">
            Conheça as principais categorias de hardware
            para começar a planejar seu computador.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to="/componentes"
                className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-line bg-ink p-6 text-center transition-all hover:-translate-y-1 hover:border-brand"
              >
                <Icon
                  size={36}
                  className="text-brand transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />

                <h3 className="text-sm font-semibold text-white">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
