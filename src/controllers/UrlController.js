import Url from "../models/Url.js";

export const create = async (req, res) => {
  try {
    const { url } = req.body;
    

    if (url.length < 10) throw new Error("tamanho inválido");

    const short = `${url.slice(10)}kdc`;

    const newShort = await Url.create({ url, short });

    return res.status(201).json(newShort);
  }catch(err){
    console.log(err);
    return res.status(400).json({err: "Um erro aconteceu"});
  }
  
}

export const findAll = async (req, res) => {
  try{
    const urls = await Url.findAll();
    return res.status(200).json(urls);
  }catch(err){
    return res.status(400).json({err: "Um erro ocorreu"});
  }
}

export const redirecionar = async (req, res) => {
  try{
    const {short} = req.params;

    const shortUrl = await Url.findOne({
      where: {short}
    })

    return res.status(200).json(shortUrl);

  }catch(err){
    return res.status(400).json({err: "Um erro ocorreu"});
  }
}