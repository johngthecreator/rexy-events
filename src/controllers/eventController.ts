import { client } from '../db/connect';
import { ObjectId } from 'mongodb';
import { IEventUpdate, IEvents } from '../lib/event';

const createNew = async (req, res) => {
    const eventData: IEvents = req.body;
    await client.connect();

    const event = { ...eventData, _id: new ObjectId() };
    const result = await client.db('rexy_events').collection(event.event_type).insertOne(event);
    if (result.acknowledged) {
        res.status(201).json(event);
    } else {
        res.status(500).json({ message: 'Some error occurred while creating the event.' });
    }
};

const updateSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);    
    const eventCategory = req.params.category;
    const eventData: IEventUpdate = req.body;

    const result = await client.db('rexy_events').collection(eventCategory).updateOne({_id: eventId},{
        $set: {
            event: eventData.event,
            address: eventData.address,
            website: eventData.website,
            description: eventData.description,
            date: eventData.date,
        }
    })

    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({message: 'Some error occurred while updating the event.'});
    }
};

const deleteSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);
    const eventCategory = req.params.category;
   
    const result = await client.db('rexy_events').collection(eventCategory).deleteOne({_id: eventId});
    if (result.deletedCount > 0) {
        res.status(200).json({acknowledged: result.acknowledged, deletedCount: result.deletedCount});
    } else {
        res.status(500).json({message: 'Some error occurred while deleting the event.'});
    }
};

const getSingle = async (req, res) => {
    await client.connect();
    const eventId = new ObjectId(req.params.id);
    const eventCategory = req.params.category;

    const event = await client.db('rexy_events').collection(eventCategory).findOne({ _id: eventId });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found.' });
    }
};

const getAll = async (req, res) => {
    await client.connect();
    const eventCategory = req.params.category;

    const events = await client.db('rexy_events').collection(eventCategory).find().toArray();

    if (events.length > 0) {
        res.status(200).json(events);
    } else {
        res.status(404).json({ message: 'No events found.' });
    }
};

const getCategories = async (req, res) => {
    await client.connect();
    const categories = await client.db('rexy_events').listCollections().toArray()
    if(categories.length > 0){
        let list_of_categories: string[] = [];
        categories.map((category)=>{
            list_of_categories.push(category.name);
        })
        res.status(200).json({categories: list_of_categories});
    }else{
        res.status(500).json({message: 'Some error occurred while gathering the event categories.'});
    }
}

export { createNew, updateSingle, deleteSingle, getSingle, getAll, getCategories };