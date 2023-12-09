// import request from 'supertest';
// import { events } from '../routes/eventRoutes';
// import { jest } from '@jest/globals';
// import { ObjectId } from 'mongodb';
// import { IEvents } from '../lib/exercises';


// type MockedFindReturn = {
//   toArray: any; 
// };

// // Mock MongoDB Client and ObjectId
// jest.mock('../db/connect', () => ({
//   client: {
//     db: () => ({
//       collection: () => ({
//         find: jest.fn().mockResolvedValue({
//           toArray: jest.fn().mockResolvedValue([
//             { event: "Farmers Market", address: "porter park", website: "farmersmarket.com", description: "local vendors", date: "11/25/2023" },
//             { event: "Test event", address: "ur mom's house", website: "urmom.com", description: "a good time", date: "9 months before you were born"}
//           ])
//         }),
//         findOne: jest.fn().mockResolvedValue(
//           { event: "Farmers Market", address: "porter park", website: "farmersmarket.com", description: "local vendors", date: "11/25/2023" }
//         ),
//         insertOne: jest.fn().mockResolvedValue({
//           _id: new ObjectId(),
//           event: "New Event", 
//           address: "city park", 
//           website: "newevent.com", 
//           description: "fun event", 
//           date: "12/12/2023"
//         }),
//         updateOne: jest.fn().mockResolvedValue({}),
//         deleteOne: jest.fn().mockResolvedValue({}),
//       })
//     })
//   }
// }));

// jest.mock('mongodb', () => ({
//   ObjectId: jest.fn().mockImplementation((id) => new ObjectId(id))
// }));

// describe('Event API', () => {
//     describe('GET /events/:id', () => {
//       it('should return all events', async () => {
//         const res = await request(events).get('/events');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body as IEvents[]).toEqual([
//           { id: "1", event: "Farmers Market", address: "porter park", website: "farmersmarket.com", description: "local vendors", date: "11/25/2023" },
//           { id: "2", event: "Test event", address: "ur mom's house", website: "urmom.com", description: "a good time", date: "9 months before you were born"}
//         ]);
//       });
//     });

// describe('Event API', () => {
//     describe('GET /events/:id', () => {
//       it('should return singular events', async () => {
//         const res = await request(events).get('/events/2');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body as IEvents[]).toEqual([
//           { id: "1", event: "Farmers Market", address: "porter park", website: "farmersmarket.com", description: "local vendors", date: "11/25/2023" },
//         ]);
//       });
//     });
  
// describe('POST /events', () => {
//   it('should create a new event', async () => {
//     const res = await request(events)
//       .post('/events')
//       .send({ id: "3", event: "New Event", address: "city park", website: "newevent.com", description: "fun event", date: "12/12/2023" });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body as IEvents[]).toEqual({ event: "New Event", address: "city park", website: "newevent.com", description: "fun event", date: "12/12/2023" });
//   });
// });
  
// describe('PUT /events/:id', () => {
//   it('should update an event', async () => {
//     const res = await request(events)
//       .put('/events/1') // Replace with a valid ID
//       .send({ event: "Updated Event" });
//     expect(res.statusCode).toEqual(204);
//     expect(res.body as IEvents[]).toEqual({ event: "Updated Event" });
//   });
// });
  
// describe('DELETE /events/:id', () => {
//   it('should delete an event', async () => {
//     const res = await request(events).delete('/events/2'); // Replace with a valid ID
//     expect(res.statusCode).toEqual(200);
//     expect(res.body as IEvents[]).toEqual({});
//   });
// });


// })});