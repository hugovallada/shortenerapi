import express from 'express';
import {encurtar, listarUrls, redirecionar} from './controllers/UrlController.js';
import {loggerMiddleware} from './middlewares/UrlMiddlewares.js';

const router = express.Router();

router.get('/', loggerMiddleware, listarUrls);
router.get('/:short', redirecionar);
router.post('/encurtar', encurtar);

export default router;
