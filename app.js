import express from 'express';
import router from './src/routes.js';

import './src/database/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(router);


app.listen(3001, () => {
  console.log('Desenvolvimento iniciado');
});
