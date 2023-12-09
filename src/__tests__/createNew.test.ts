import request from 'supertest';
import express, { Express } from 'express';
import { events } from '../routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/events', events);

jest.mock('../services/auth', () => ({
  ensureAuth: jest.fn((req, res, next) => next()),
}));

const newEvent = {
  event: 'Test Event',
  address: '123 Mock Street, Mock City, MK123',
  website: 'https://www.example.com',
  description: 'This is a test event',
  date: '2023-01-01',
  event_type: 'string'
};

describe('Event Routes', () => {
  describe('Authenticated Access', () => {
    it('allows creating a new event when authenticated', async () => {
      const response = await request(app)
        .post('/events')
        .send(newEvent);
      expect(response.status).toBe(201);
    });
  });

  describe('Unauthenticated Access', () => {
    it('denies creating a new event when not authenticated', async () => {
      const { ensureAuth } = require('../services/auth');
      (ensureAuth as jest.Mock).mockImplementationOnce((req, res, next) => {
        res.status(401).send('Unauthorized');
      });

      const response = await request(app).post('/events').send(newEvent);
      expect(response.status).toBe(401);
    });
  });
});
