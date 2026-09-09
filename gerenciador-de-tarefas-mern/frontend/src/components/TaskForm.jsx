import { useEffect, useState } from "react";

function TaskForm({
  task,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pendente",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pendente",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "pendente",
      });
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {task ? "Editar tarefa" : "Nova tarefa"}
      </h2>

      <div>
        <label htmlFor="title">
          Título
        </label>

        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título da tarefa"
          required
        />
      </div>

      <div>
        <label htmlFor="description">
          Descrição
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição da tarefa"
          rows="4"
        />
      </div>

      <div>
        <label htmlFor="status">
          Status
        </label>

        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pendente">
            Pendente
          </option>

          <option value="concluida">
            Concluída
          </option>
        </select>
      </div>

      <button type="submit">
        {task
          ? "Salvar alterações"
          : "Criar tarefa"}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="secondary"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TaskForm;
