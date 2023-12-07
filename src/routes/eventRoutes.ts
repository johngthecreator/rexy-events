import express, { Router } from 'express';
import { createNew, updateSingle, deleteSingle, getSingle, getAll } from '../controllers/eventController';
import { ensureAuth } from '../services/auth';

const router: Router = express.Router();

router.post("/", ensureAuth, createNew);
router.put("/:id", ensureAuth, updateSingle);
router.delete("/:id", ensureAuth, deleteSingle);

router.get("/:id", ensureAuth, getSingle);
router.get("/", ensureAuth, getAll);

export { router as events };