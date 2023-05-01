import express from 'express';
import newrelic from 'newrelic';
import cron from 'node-cron';
import masterDataImporter from './masterDataImporter';
import { importType } from './types';
import * as dotenv from 'dotenv';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
import * as path from "path";

process.env.NODE_ENV = 'development'
console.log(process.env.NODE_ENV)
dotenv.config({
  path: path.resolve(`${__dirname}/env/.env.${process.env.NODE_ENV}`)
});

console.log(path.resolve(`${__dirname}/env/.env.${process.env.NODE_ENV}`))

// instrument express after the agent has been loaded
newrelic.instrumentLoadedModule(
  'express',    // the module's name, as a string
  express // the module instance
);
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/health', (req, res) => {
  res.send({ status: 'UP' });
});

// TODO - store last_updated_ts somewhere 
// const last_updated_ts = new Date().toISOString();// get timestamp from datetime 
const last_updated_ts = "2023-04-21T03:42:18.187Z"
masterDataImporter(importType.WxCEnterprise, last_updated_ts);
masterDataImporter(importType.WxCDepartments, last_updated_ts);
masterDataImporter(importType.WxCHuntGroup, last_updated_ts);
masterDataImporter(importType.WxCStores, last_updated_ts);
masterDataImporter(importType.WxCUsers, last_updated_ts);
// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
//   masterDataImporter(importType.Enterprise, last_updated_ts);
// });

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
