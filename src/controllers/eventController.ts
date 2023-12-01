import { client } from '../db/connect';
import { ObjectId } from 'mongodb';
import { IEvents } from '../lib/exercises';

const createNew = async (req, res) => {
    await client.connect();
    const eventData: IEvents = req.body;

    const event = { ...eventData, _id: new ObjectId() };
    const result = await client.db('rexy_events').collection('events').insertOne(event);
    if (result.acknowledged) {
        res.status(201).json(event);
    } else {
        res.status(500).json({ message: 'Some error occurred while creating the event.' });
    }
};

const updateSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);    
    const eventData: IEvents = req.body;

    const result = await client.db('rexy_events').collection('events').replaceOne({_id: eventId}, eventData)

    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({message: 'Some error occurred while updating the event.'});
    }
};

const deleteSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);
   
    const result = await client.db('rexy_events').collection('events').deleteOne({_id: eventId});
    if (result.deletedCount > 0) {
        res.status(200).json({acknowledged: result.acknowledged, deletedCount: result.deletedCount});
    } else {
        res.status(500).json({message: 'Some error occurred while deleting the event.'});
    }
};

const getSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);

    const event = await client.db('rexy_events').collection('events').findOne({ _id: eventId });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found.' });
    }
};

const getAll = async (req, res) => {
    await client.connect();

    const events = await client.db('rexy_events').collection('events').find().toArray();

    if (events.length > 0) {
        res.status(200).json(events);
    } else {
        res.status(404).json({ message: 'No events found.' });
    }
};

export { createNew, updateSingle, deleteSingle, getSingle, getAll };