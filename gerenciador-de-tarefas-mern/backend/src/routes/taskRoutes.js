const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
getTasks,
createTask,
updateTask,
deleteTask
} = require("../controllers/taskController");

const {
validate,
createTaskValidation,
updateTaskValidation,
taskIdValidation
} = require("../middlewares/validation");

const router = express.Router();

// Todas as rotas abaixo exigem autenticação
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

