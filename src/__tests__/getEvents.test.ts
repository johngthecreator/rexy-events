import request from 'supertest';
import express, { Express } from 'express';
import { events } from '../routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/events', events);

describe('GET Requests', () => {
  it('returns status 200 and all events when getting all events', async () => {
    const response = await request(app).get('/events');
    expect(response.status).toBe(200);
  });

  it('returns status 404 when getting a non-existent event', async () => {
    const response = await request(app).get('/events/nonexistent');
    expect(response.status).toBe(404);
  });
});
