//NOTE: THE ORDER OF ROUTES MATTER
import express from "express";
import todosController from "../../controllers/v1/todos-controller";
import { validateFields } from "../../middleware/validation/validation";
import { Todo } from "../../models/v1/todo-model";
import { todoValidationMapping, validateTodo } from "../../middleware/validation/todos";

const router = express.Router();

router.get("/", todosController.getTodos);
router.post("/", validateFields<Todo>(todoValidationMapping), validateTodo, todosController.addTodo);
router.patch("/:id", validateFields<Todo>(todoValidationMapping), todosController.patchTodo);
router.put("/:id", validateFields<Todo>(todoValidationMapping), todosController.putTodo);
router.delete("/:id", todosController.deleteTodo);

export = router;
