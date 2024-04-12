// import { openDb } from './configDB.js';
import express from 'express';
import createTable from './controller/Person.js';
import router from './routes.js';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

createTable();
app.use(router);

app.listen(3000, () => console.log('API is running'));

https.createServer({
  cert: fs.readFileSync('src/SSL/code.crt'),
  key: fs.readFileSync('src/SSL/code.key'),
}, app).listen(3001, () => console.log('Server is running in https'));