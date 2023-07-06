import serverless from 'serverless-http';
import express from 'express';
import { DynamoDB } from 'aws-sdk';
import { ApiHandler } from 'sst/node/api';

const docClient = new DynamoDB.DocumentClient();

const app = express();

app.get('/test', async (req, res) => {
  await docClient.put({
    TableName: process.env.TABLE_NAME as string,
    Item: {
      pk: 'gfd',
      sk: 'ffs',
      foo: 'bar',
    }
  }).promise();

  return res.status(200).json({
    message: 'success'
  })
});

const handler = serverless(app, { provider: 'aws' });

export const run = ApiHandler(async (event, context) => {
  const result = await handler(event, context);
  return result;
});
