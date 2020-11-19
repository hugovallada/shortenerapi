import fs from 'fs';
import path from 'path';
import {getData} from '../utils/DataUtil.js';

export const loggerMiddleware = (req, res, next) => {
  try {
    const msg = `INFO: Acesso realizado em: - ${getData()}\n`;
    console.log(path.resolve('.', 'src', 'logs', 'logs.log'));
    fs.writeFile(path.resolve('.', 'src', 'logs', 'logs.log'), msg, {flag: 'a'}, (err) => err);
    next();
  } catch (err) {
    console.log('Erro ao escrever o logger');

    const data = getData();
    fs.writeFile(path.resolve('.', 'src', 'logs', 'error-logs.log'), `WARNING: Não foi possível escrever o log - ${data}\n`, {flag: 'a'}, (err) => err);
    fs.writeFile(path.resolve('.', 'src', 'logs', 'warnings', `${data}.log`), `V: ${err}`, {flag: 'a'}, (err) => err);
    next();
  }
};
