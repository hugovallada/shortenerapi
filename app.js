import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.listen(3001, () => {
  console.log('Desenvolvimento iniciado');
});
