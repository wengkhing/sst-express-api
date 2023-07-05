import { ApiHandler } from "sst/node/api";
import serverless from 'serverless-http';
import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  return res.status(200).json({
    message: 'success'
  })
});

const handler = serverless(app, { provider: 'aws' });

export const run = ApiHandler(async (event, context) => {
  const result = await handler(event, context);
  return result;
});
