import Url from '../models/Url.js';
import shortid from 'shortid';
import validUrl from 'valid-url';

// TODO: Adicionar login e proteger o acesso a lsitagem total

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
    return res.status(200).send(`${baseUrl}${shortUrl.short}`);
  } catch (err) {
    console.log(err);
    return res.status(400).json('Um erro aconteceu');
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

export const listarUrls = async (req, res) => {
  try {
    const baseUrl = 'localhost:3001/';
    const urls = await Url.findAll();

    const listaUrls = [];

    urls.map((url) => {
      listaUrls.push({
        short: `${baseUrl}${url.short}`,
        original: url.url,
        accessed: url.accessed,
      },
      );
    });

    return res.status(200).json(listaUrls);
  } catch (err) {
    return res.status(400).json({err: 'Um erro aconteceu'});
  }
};

export const redirecionar = async (req, res) => {
  try {
    const {short} = req.params;

    const shortUrl = await Url.findOne({
      where: {short},
    });

    await shortUrl.update(
        {
          accessed: shortUrl.accessed + 1,
        },
        {
          where: {id: shortUrl.id},
        },
    );

    return res.redirect(`${shortUrl.url}`);
  } catch (err) {
    return res.status(400).json({err: 'Um erro ocorreu'});
  }
};
