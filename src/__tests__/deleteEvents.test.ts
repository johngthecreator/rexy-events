import request from 'supertest';
import express, { Express } from 'express';
import { events } from '../routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/events', events);

const newEvent = {
    event: 'Test Event',
    address: '123 Mock Street, Mock City, MK123',
    website: 'https://www.example.com',
    description: 'This is a test event',
    date: '2023-01-01',
    event_type: 'string'
};

describe('DELETE Requests', () => {
  it('deletes an existing event', async () => {
    // Mock a scenario where you have an existing event ID to delete
    const eventId = 'existing_event_id';
    const response = await request(app).delete(`/events/${eventId}`);
    expect(response.status).toBe(200);
  });

  it('returns status 404 when trying to delete a non-existent event', async () => {
    const nonExistentId = 'non_existent_id';
    const response = await request(app).delete(`/events/${nonExistentId}`);
    expect(response.status).toBe(404);
  });
});
