function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>

        <span
          className={
            task.status === "concluida"
              ? "status completed"
              : "status pending"
          }
        >
          {task.status === "concluida"
            ? "Concluída"
            : "Pendente"}
        </span>
      </div>

      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onToggleStatus(task)}
        >
          {task.status === "concluida"
            ? "Reabrir"
            : "Concluir"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(task)}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="danger"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
