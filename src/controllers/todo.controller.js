import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi,
} from '../services/todo.service.js';
import AppError from '../utils/AppError.js';
import {sendNotFoundResponse, sendSuccessResponse} from "../utils/response.helper.js";

export async function getTodos(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const search = req.query.search || '';

  const offset = (page - 1) * limit;
  try {
    const todos = await getAllTodos(offset, limit, search);

    return sendSuccessResponse(res, todos);
  } catch (error) {
    throw new AppError(`Failed to get todos: ${error.message}`, 400, error.name);
  }
}

export async function getTodoById(req, res) {
  try {
    const todo = await getTodoByIdApi(req.params.todoId);

    if (todo) {
      return sendSuccessResponse(res, todo);
    }

    return sendNotFoundResponse(res);
  } catch (error) {
    throw new AppError(`Failed to get todo: ${error.message}`, 400, error.name);
  }
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    throw new AppError(`The todoId is required`, 400, 'Bad request');
  }
  try {
    const deletedTodoNumber = await deleteTodoByIdApi(todoId);

    if (!deletedTodoNumber) {
      return sendNotFoundResponse(res);
    }
    return sendSuccessResponse(res, deletedTodoNumber);
  } catch (error) {
    throw new AppError(`Failed to delete todo: ${error.message}`, 400, error.name);
  }
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    throw new AppError(`The todo is required`, 400, 'Bad request');
  }
  try {
    const addedTodo = await createTodoApi(addTodo);
    return sendSuccessResponse(res, addedTodo);
  } catch (error) {
    throw new AppError(`The id ${addTodo.id} already exists`, 400, error.name);
  }
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;
  try {
    const updatedTodoNumber = await updateTodoApi(updateTodo);

    if (!updatedTodoNumber) {
      return sendNotFoundResponse(res);
    }
    return sendSuccessResponse(res, updatedTodoNumber);
  } catch (error) {
    throw new AppError(`Failed to update todo: ${error.message}`, 400, error.name);
  }
}

export async function countTodo(req, res) {
  const search = req.query.search;
  try {
    const todoCount = await countTodoApi(search);

    return sendSuccessResponse(res, todoCount);
  } catch (error) {
    throw new AppError(`Failed to count todos: ${error.message}`, 400, error.name);
  }
}