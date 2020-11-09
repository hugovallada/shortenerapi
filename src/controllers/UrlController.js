import Url from '../models/Url.js';
import shortid from 'shortid';
import validUrl from 'valid-url';

export const encurtar = async (req, res) => {
  try {
    const baseUrl = 'localhost:3001/';

    const {url} = req.body;
    console.log(url);

    if (!validUrl.isUri(url)) throw new Error('Url inválida');

    let shortUrl = await Url.findOne({
      where: {
        url,
      },
    });


    if (!shortUrl) {
      const short = shortid.generate();
      shortUrl = await Url.create({
        url,
        short,
      });
    }

    return res.status(200).json(`${baseUrl}${shortUrl.short}`);
  } catch (err) {
    console.log(err);
    return res.status(400).json('Um erro aconteceu');
  }
};

export const create = async (req, res) => {
  try {
    const {url} = req.body;


    if (url.length < 10) throw new Error('tamanho inválido');

    const short = `${url.slice(10)}kdc`;

    const newShort = await Url.create({url, short});

    return res.status(201).json(newShort);
  } catch (err) {
    console.log(err);
    return res.status(400).json({err: 'Um erro aconteceu'});
  }
};

export const findAll = async (req, res) => {
  try {
    const urls = await Url.findAll();
    return res.status(200).json(urls);
  } catch (err) {
    return res.status(400).json({err: 'Um erro ocorreu'});
  }
};

export const redirecionar = async (req, res) => {
  try {
    const {short} = req.params;

    const shortUrl = await Url.findOne({
      where: {short},
    });

    return res.redirect(`${shortUrl.url}`);
  } catch (err) {
    return res.status(400).json({err: 'Um erro ocorreu'});
  }
};
