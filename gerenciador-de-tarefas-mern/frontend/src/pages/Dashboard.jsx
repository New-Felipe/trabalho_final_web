import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  // Buscar tarefas
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Erro ao carregar tarefas."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Criar ou editar tarefa
  const handleSubmitTask = async (taskData) => {
    try {
      setError("");

      if (editingTask) {
        await api.put(
          `/tasks/${editingTask._id}`,
          taskData
        );
      } else {
        await api.post("/tasks", taskData);
      }

      setShowForm(false);
      setEditingTask(null);

      await loadTasks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Erro ao salvar tarefa."
      );
    }
  };

  // Abrir edição
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Excluir tarefa
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/tasks/${id}`);

      await loadTasks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Erro ao excluir tarefa."
      );
    }
  };

  // Alterar status
  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "concluida"
        ? "pendente"
        : "concluida";

    try {
      setError("");

      await api.put(
        `/tasks/${task._id}`,
        {
          status: newStatus,
        }
      );

      await loadTasks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Erro ao atualizar status."
      );
    }
  };

  // Cancelar formulário
  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Abrir formulário para nova tarefa
  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  return (
    <div>
      <Navbar />

      <main>
        <div>
          <h1>Minhas tarefas</h1>

          <p>
            Gerencie suas atividades.
          </p>

          <button
            type="button"
            onClick={handleNewTask}
          >
            + Nova Tarefa
          </button>
        </div>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmitTask}
            onCancel={handleCancel}
          />
        )}

        {loading ? (
          <p>Carregando tarefas...</p>
        ) : tasks.length === 0 ? (
          <div>
            <h2>Nenhuma tarefa encontrada</h2>

            <p>
              Clique em "Nova Tarefa" para começar.
            </p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
