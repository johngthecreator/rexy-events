export interface IEvents {
    event: "string",
    address: "string",
    website: "string",
    description: "string",
    date:"string",
    event_type:"string",
}

export interface IEventUpdate {
    event?: "string",
    address?: "string",
    website?: "string",
    description?: "string",
    date?:"string",
}