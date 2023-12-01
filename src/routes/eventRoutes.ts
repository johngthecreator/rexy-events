import express, { Router } from 'express';
import { createNew, updateSingle, deleteSingle, getSingle, getAll } from '../controllers/eventController';

const router: Router = express.Router();

router.post("/", createNew);
router.put("/:id", updateSingle);
router.delete("/:id", deleteSingle);

router.get("/:id", getSingle);
router.get("/", getAll);

export { router as events };