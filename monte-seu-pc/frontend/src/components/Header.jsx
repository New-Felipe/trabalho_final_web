import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, User, X, Zap } from "lucide-react";

const navItems = [
  { label: "Início", to: "/" },
  { label: "Montar PC", to: "/montar-pc" },
  { label: "Componentes", to: "/componentes" },
  { label: "Favoritos", to: "/favoritos" },
  { label: "Minhas Montagens", to: "/minhas-montagens" },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="Monte Seu PC - Página Inicial"
    >
      <img 
        src="/images/favicon.png"
        alt=""
        className="h-9 w-9 shrink-0 object-contain"
      />

      <span className="flex flex-col leading-none">
        <span className="text-sm font-extrabold tracking-wide text-white">
          MONTE SEU PC
        </span>

        <span className="mt-1 text-[10px] font-bold tracking-[0.18em] text-brand">
          HARDWARE PRECISION
        </span>
      </span>
    </Link>
  );
}

const navLinkClass = ({ isActive }) =>
  [
    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-brand/15 text-brand"
      : "text-muted hover:bg-graphite-soft hover:text-white",
  ].join(" ");

export default function Header({
  isAuthenticated = false,
  currency = "R$ BRL",
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={navLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Indicador de moeda */}
          <span className="hidden rounded-md border border-line bg-graphite px-3 py-2 text-xs font-bold text-white xl:inline-flex">
            {currency}
          </span>

          {/* Login ou perfil */}
          {isAuthenticated ? (
            <Link
              to="/perfil"
              className="hidden size-9 items-center justify-center rounded-full bg-brand text-ink sm:flex"
              aria-label="Meu perfil"
            >
              <User size={18} aria-hidden="true" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md border border-line bg-graphite px-3 py-2 text-sm font-semibold text-white hover:border-muted sm:inline-flex"
            >
              Login / Cadastro
            </Link>
          )}

          {/* Botão para iniciar montagem */}
          <Link
            to="/montar-pc"
            className="hidden items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-brand-hover md:inline-flex"
          >
            <Zap size={16} aria-hidden="true" />
            Começar Montagem
          </Link>

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-md bg-graphite text-white hover:bg-graphite-soft lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="border-t border-line bg-graphite lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-t border-line px-4 py-3">
            <Link
              to={isAuthenticated ? "/perfil" : "/login"}
              onClick={closeMenu}
              className="rounded-md border border-line bg-ink px-3 py-2 text-center text-sm font-semibold text-white"
            >
              {isAuthenticated ? "Meu Perfil" : "Login / Cadastro"}
            </Link>

            <Link
              to="/montar-pc"
              onClick={closeMenu}
              className="rounded-md bg-brand px-3 py-2 text-center text-sm font-bold text-ink"
            >
              Começar Montagem
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
