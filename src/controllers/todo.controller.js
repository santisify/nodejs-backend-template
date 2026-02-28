import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi,
} from '../services/todo.service.js';
import AppError from '../utils/AppError.js';

export async function getTodos(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const search = req.query.search || '';

  const offset = (page - 1) * limit;
  try {
    const todos = await getAllTodos(offset, limit, search);

    return res.status(200).json(todos);
  } catch (error) {
    throw new AppError(`Failed to get todos: ${error.message}`, 400, error.name);
  }
}

export async function getTodoById(req, res) {
  if (!req.params.todoId) {
    return res.status(400).send('todoId is required');
  }
  try {
    const todo = await getTodoByIdApi(req.params.todoId);

    if (todo) {
      return res.status(200).json(todo);
    }

    return res.status(404).send('404 Not Found');
  } catch (error) {
    throw new AppError(`Failed to get todo: ${error.message}`, 400, error.name);
  }
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).send('todoId is required');
  }
  try {
    await deleteTodoByIdApi(todoId);

    return res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    throw new AppError(`Failed to delete todo: ${error.message}`, 400, error.name);
  }
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    return res.status(400).send('Bad request');
  }
  try {
    const addedTodo = await createTodoApi(addTodo);

    return res.status(200).json({
      message: 'Todo added successfully',
      data: addedTodo,
    });
  } catch (error) {
    throw new AppError(`The id ${addTodo.id} already exists`, 400, error.name);
  }
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;
  try {
    const updatedTodo = await updateTodoApi(updateTodo);

    return res.status(200).json({
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    throw new AppError(`Failed to update todo: ${error.message}`, 400, error.name);
  }
}

export async function countTodo(req, res) {
  const search = req.query.search;
  try {
    const todoCount = await countTodoApi(search);

    return res.status(200).json({
      count: todoCount,
    });
  } catch (error) {
    throw new AppError(`Failed to count todos: ${error.message}`, 400, error.name);
  }
}