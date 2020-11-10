import express from 'express';
import {create, redirecionar, encurtar, listarUrls} from './controllers/UrlController.js';

const router = express.Router();

router.post('/', create);
router.get('/', listarUrls);
router.get('/:short', redirecionar);
router.post('/encurtar', encurtar);

export default router;
