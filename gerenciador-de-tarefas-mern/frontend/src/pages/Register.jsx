import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);

      alert("Cadastro realizado com sucesso!");

      navigate("/");
    } catch (error) {
      console.error("Erro no cadastro:", error);

      setError(
        error.response?.data?.message ||
          "Erro ao realizar cadastro."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>

      <h2>Criar conta</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Nome
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Senha
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p>
        Já possui uma conta?{" "}
        <Link to="/">
          Fazer login
        </Link>
      </p>
    </div>
  );
}

export default Register;
