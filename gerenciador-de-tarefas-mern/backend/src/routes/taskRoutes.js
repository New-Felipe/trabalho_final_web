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

router.use(authMiddleware);

router.get("/", getTasks);

router.post(
  "/",
  createTaskValidation,
  validate,
  createTask
);

router.put(
  "/:id",
  taskIdValidation,
  updateTaskValidation,
  validate,
  updateTask
);

router.delete(
  "/:id",
  taskIdValidation,
  validate,
  deleteTask
);

module.exports = router;
