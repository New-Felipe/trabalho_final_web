const Task = require("../models/Task");

// GET - Listar todas as tarefas do usuário autenticado
const getTasks = async (req, res) => {
try {
const tasks = await Task.find({
user: req.userId
}).sort({
createdAt: -1
});

return res.status(200).json(tasks);
} catch (error) {
console.error("Erro ao buscar tarefas:", error);

return res.status(500).json({
message: "Erro ao buscar tarefas."
});
}
};

// GET - Buscar uma tarefa específica
const getTaskById = async (req, res) => {
try {
const task = await Task.findOne({
_id: req.params.id,
user: req.userId
});

if (!task) {
return res.status(404).json({
message: "Tarefa não encontrada."
});
}

return res.status(200).json(task);
} catch (error) {
console.error("Erro ao buscar tarefa:", error);

return res.status(500).json({
message: "Erro ao buscar tarefa."
});
}
};

// POST - Criar uma nova tarefa
const createTask = async (req, res) => {
try {
const {
title,
description,
status
} = req.body;

const task = await Task.create({
title,
description,
status: status || "pendente",
user: req.userId
});

return res.status(201).json({
message: "Tarefa criada com sucesso.",
task
});
} catch (error) {
console.error("Erro ao criar tarefa:", error);

return res.status(500).json({
message: "Erro ao criar tarefa."
});
}
};

// PUT - Atualizar uma tarefa
const updateTask = async (req, res) => {
try {
const task = await Task.findOne({
_id: req.params.id,
user: req.userId
});

if (!task) {
return res.status(404).json({
message: "Tarefa não encontrada."
});
}

const {
title,
description,
status
} = req.body;

if (title !== undefined) {
task.title = title;
}

if (description !== undefined) {
task.description = description;
}

if (status !== undefined) {
task.status = status;
}

await task.save();

return res.status(200).json({
message: "Tarefa atualizada com sucesso.",
task
});
} catch (error) {
console.error("Erro ao atualizar tarefa:", error);

return res.status(500).json({
message: "Erro ao atualizar tarefa."
});
}
};

// PATCH - Alterar somente o status
const updateTaskStatus = async (req, res) => {
try {
const { status } = req.body;

if (
status !== "pendente" &&
status !== "concluída"
) {
return res.status(400).json({
message:
"Status inválido. Utilize 'pendente' ou 'concluída'."
});
}

const task = await Task.findOne({
_id: req.params.id,
user: req.userId
});

if (!task) {
return res.status(404).json({
message: "Tarefa não encontrada."
});
}

task.status = status;

await task.save();

return res.status(200).json({
message: "Status atualizado com sucesso.",
task
});
} catch (error) {
console.error("Erro ao atualizar status:", error);

return res.status(500).json({
message: "Erro ao atualizar status."
});
}
};

// DELETE - Excluir uma tarefa
const deleteTask = async (req, res) => {
try {
const task = await Task.findOneAndDelete({
_id: req.params.id,
user: req.userId
});

if (!task) {
return res.status(404).json({
message: "Tarefa não encontrada."
});
}

return res.status(200).json({
message: "Tarefa excluída com sucesso."
});
} catch (error) {
console.error("Erro ao excluir tarefa:", error);

return res.status(500).json({
message: "Erro ao excluir tarefa."
});
}
};

module.exports = {
getTasks,
getTaskById,
createTask,
updateTask,
updateTaskStatus,
deleteTask
};
