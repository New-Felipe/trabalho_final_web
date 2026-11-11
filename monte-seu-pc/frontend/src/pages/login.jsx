import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Erro ao realizar login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-line bg-graphite p-6 shadow-xl sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold text-white">
              Entre na sua conta
            </h1>

            <p className="mt-2 text-sm text-muted">
              Acesse suas montagens e continue planejando seu PC.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-white"
              >
                E-mail
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-white placeholder:text-muted outline-none transition-colors focus:border-brand"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Senha
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-white placeholder:text-muted outline-none transition-colors focus:border-brand"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand px-4 py-3 font-bold text-ink transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Ainda não possui uma conta?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand transition-colors hover:text-brand-hover hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
