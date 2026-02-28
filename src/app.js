import express from 'express';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit';
import routers from './routes/index.js';
import {pinoHttpMiddleware} from "./utils/logger.helper.js";

const limiter = rateLimit({
  windowMs: 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

// res body日志显示，有安全风险不建议开启
// app.use((_req, res, next) => {
//   const originJson = res.json();
//   res.json = function (body) {
//     res.body = body;
//     originJson.call(this, body);
//     return this;
//   };
//   next();
// });

app.use(pinoHttpMiddleware);

app.use('/v1', routers);

export default app;