import express from 'express';
import {encurtar, listarUrls, redirecionar} from './controllers/UrlController.js';

const router = express.Router();

router.get('/', listarUrls);
router.get('/:short', redirecionar);
router.post('/encurtar', encurtar);

export default router;
