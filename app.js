import express from 'express';
import cors from 'cors';
import router from './src/routes.js';

import './src/database/index.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use(router);


app.listen(3001, () => {
  console.log('Desenvolvimento iniciado');
});
