import express from 'express';
import cors from 'cors';
import {pinoHttpMiddleware} from "./utils/logger.helper.js";
import RateLimiter from './utils/RateLimiter.js';
import globalErrorHandler from './utils/globalErrorHandler.js';
import {verifyToken} from "./utils/JWT.helper.js";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(RateLimiter);
app.use(pinoHttpMiddleware);
app.use('/v1', userRoute);

app.use(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  const token = authorization.split(' ')[1];
  await verifyToken(token);
  next();
});

app.use('/v1', todoRoute);
app.use(globalErrorHandler)

export default app;