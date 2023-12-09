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
    event_type: 'events'
};

let respData:string = "";

describe('Create New Event', () => {
  it('allows creating a new event when authenticated', async () => {
    const response = await request(app)
      .post('/events')
      .send(newEvent);
    respData = JSON.parse(response.res.text)._id;
    expect(response.status).toBe(201);
  });
});

describe('DELETE Requests', () => {
  it('deletes an existing event', async () => {
    // Mock a scenario where you have an existing event ID to delete
    const response = await request(app).delete(`/events/events/${respData}`);
    expect(response.status).toBe(200);
  });

  it('returns status 404 when trying to delete a non-existent event', async () => {
    const response = await request(app).delete(`/events/${respData}`);
    expect(response.status).toBe(404);
  });
});
