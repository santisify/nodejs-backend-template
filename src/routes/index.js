import todoRouter from './todo.route.js';
import express from 'express';

const router = express.Router();

router.use(todoRouter);

export default router;