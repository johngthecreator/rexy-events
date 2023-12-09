import request from 'supertest';
import express, { Express } from 'express';
import { events } from '../routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/events', events);

describe('Check Status Codes', () => {
  it('returns status 404 for a non-existent route', async () => {
    const response = await request(app).get('/nonexistent_route');
    expect(response.status).toBe(404);
  });

});
