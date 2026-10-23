import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function EmDesenvolvimento({ titulo }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-brand">
          {titulo}
        </h1>

        <p className="mt-6 text-muted">
          Estamos preparando esta funcionalidade do Monte Seu PC.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-brand px-6 py-3 font-bold text-ink"
        >
          Voltar ao início
        </Link>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/montar-pc"
          element={<EmDesenvolvimento titulo="Montar PC" />}
        />

        <Route
          path="/componentes"
          element={<EmDesenvolvimento titulo="Componentes" />}
        />

        <Route
          path="/favoritos"
          element={<EmDesenvolvimento titulo="Favoritos" />}
        />

        <Route
          path="/minhas-montagens"
          element={<EmDesenvolvimento titulo="Minhas Montagens" />}
        />

        <Route
          path="/perfil"
          element={<EmDesenvolvimento titulo="Meu Perfil" />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
