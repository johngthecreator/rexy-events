import request from 'supertest';
import express, { Express } from 'express';
import { events } from '../routes/eventRoutes'; // Import your events routes
import { ensureAuth } from '../services/auth'; // Import your auth middleware
import passport from 'passport';
import dotenv from "dotenv";

// Mock Passport.js isAuthenticated method
jest.mock('passport', () => ({
  ...jest.requireActual('passport'),
  isAuthenticated: jest.fn(() => true) // Default to authenticated
}));

// Set up the Express app for testing
const app: Express = express();
dotenv.config()
app.use(express.json()); // Assuming you're using JSON payloads

// Use your events routes in the app
app.use('/events', events);

describe('Protected event routes', () => {
  const newEvent = {
    // Example event data, modify as per your schema
    title: 'Test Event',
    description: 'This is a test event',
    date: '2023-01-01'
  };

  it('allows creating a new event when authenticated', async () => {
    const response = await request(app)
      .post('/events')
      .send(newEvent);
    expect(response.status).toBe(200); // Or another success status code as per your implementation
    // Add more assertions based on your route's expected response
  });

  it('denies creating a new event when not authenticated', async () => {
    // Modify the mock to simulate an unauthenticated request
    (passport.isAuthenticated as jest.Mock).mockImplementationOnce(() => false);

    const response = await request(app)
      .post('/events')
      .send(newEvent);
    expect(response.status).toBe(401);
    // Add more assertions based on your route's expected response
  });
});