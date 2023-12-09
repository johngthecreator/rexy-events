import express, { Router } from 'express';
import { createNew, updateSingle, deleteSingle, getSingle, getAll, getCategories } from '../controllers/eventController';
import { ensureAuth } from '../services/auth';

const router: Router = express.Router();

router.post("/", ensureAuth, createNew);
router.put("/:category/:id", ensureAuth, updateSingle);
router.delete("/:category/:id", ensureAuth, deleteSingle);

router.get("/:category/:id", getSingle);
router.get("/:category", getAll);
router.get("/", getCategories);

export { router as events };