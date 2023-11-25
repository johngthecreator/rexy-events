import express, { Express } from 'express';
import { createNew, updateSingle, deleteSingle } from '../controllers/eventController.js';
const app: Express = express();

export const events = express.Router();
events.post("/", createNew);
events.put("/:id", updateSingle);
events.delete("/:id", deleteSingle);

