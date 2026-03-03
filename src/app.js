import express from 'express';
import cors from 'cors';
import routers from './routes/index.js';
import { pinoHttpMiddleware } from "./utils/logger.helper.js";
import RateLimiter from './utils/RateLimiter.js';
import globalErrorHandler from './utils/globalErrorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(RateLimiter);
app.use(pinoHttpMiddleware);

app.use('/v1', routers);
app.use(globalErrorHandler)

export default app;