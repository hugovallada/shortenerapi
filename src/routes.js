import express from 'express';
import { create, findAll, redirecionar } from './controllers/UrlController.js';


const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:short", redirecionar);

export default router;
