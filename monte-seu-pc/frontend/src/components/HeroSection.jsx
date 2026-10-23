
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Cpu,
  ImageIcon,
  ShieldCheck,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";

const DEFAULT_BADGES = [
  "Compatibilidade Inteligente",
  "Verificação de Soquetes",
  "Análise de Consumo",
];

const DEFAULT_HIGHLIGHTS = [
  "Análise de Possíveis Gargalos",
  "Checagem de Espaço Físico",
  "Alertas de Preço Personalizados",
];

function FloatingChip({ title, subtitle, className = "" }) {
  return (
    <div
      className={`absolute z-10 rounded-lg border border-line bg-ink/95 px-3 py-2 shadow-lg ${className}`}
    >
      <p className="text-xs font-bold text-white">
        {title}
      </p>

      {subtitle && (
        <p className="mt-1 text-[10px] text-brand">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function MascotSlot({ src, alt }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-graphite p-3 shadow-2xl">
        {!imageFailed ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageFailed(true)}
            className="aspect-square w-full rounded-2xl object-contain"
          />
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center gap-3 text-muted">
            <ImageIcon size={40} aria-hidden="true" />
            <p className="text-center text-sm">
              Espaço reservado para o mascote
            </p>
          </div>
        )}
      </div>

      <FloatingChip
        className="left-0 top-4 sm:-left-4"
        title="Compatibilidade"
        subtitle="Verificação de componentes"
      />

      <FloatingChip
        className="bottom-6 right-0 sm:-right-4"
        title="Assistente de Montagem"
        subtitle="Orientações para seu PC"
      />
    </div>
  );
}

export default function HeroSection({
  badges = DEFAULT_BADGES,
  highlights = DEFAULT_HIGHLIGHTS,
  mascotSrc = "/images/mascote.png",
  mascotAlt = "Robô assistente do Monte Seu PC segurando uma placa de vídeo",
}) {
  const badgeIcons = [Sparkles, ShieldCheck, Cpu];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink"
    >
      <div
        className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          {/* Indicadores superiores */}
          <ul className="flex flex-wrap gap-2">
            {badges.map((badge, index) => {
              const Icon = badgeIcons[index % badgeIcons.length];

              return (
                <li
                  key={badge}
                  className="flex items-center gap-2 rounded-full border border-line bg-graphite px-3 py-1.5 text-xs font-medium text-white"
                >
                  <Icon
                    size={14}
                    className="text-brand"
                    aria-hidden="true"
                  />

                  {badge}
                </li>
              );
            })}
          </ul>

          {/* Título principal */}
          <h1
            id="hero-title"
            className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl"
          >
            Monte o PC dos seus sonhos
            <span className="block text-brand">
              com mais segurança.
            </span>
          </h1>

          {/* Descrição */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Escolha componentes compatíveis, identifique
            possíveis limitações de desempenho e encontre
            ofertas para montar o computador ideal para você.
          </p>

          {/* Botões */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/montar-pc"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-bold text-ink transition-colors hover:bg-brand-hover"
            >
              <Zap size={18} aria-hidden="true" />
              Iniciar Montagem Grátis
            </Link>

            <Link
              to="/componentes"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-graphite px-6 py-3 font-semibold text-white transition-colors hover:border-muted"
            >
              <Tag size={18} aria-hidden="true" />
              Explorar Componentes
            </Link>
          </div>

          {/* Benefícios */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs font-medium text-white"
              >
                <CheckCircle2
                  size={17}
                  className="text-success"
                  aria-hidden="true"
                />

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mascote original */}
        <MascotSlot
          src={mascotSrc}
          alt={mascotAlt}
        />
      </div>
    </section>
  );
}
