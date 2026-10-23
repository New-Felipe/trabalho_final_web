import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Gerenciador de Tarefas</h2>
      </div>

      <div className="navbar-user">
        <span>
          Olá, {user?.name || "Usuário"}
        </span>

        <button
          type="button"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
