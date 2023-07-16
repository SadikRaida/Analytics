import {ServicesBases} from "./servicesBases.ts";

const getEvents = async (apiKey):Promise<Event[]> => {
    const response = await fetch(ServicesBases.apiUrl + '/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apikey: apiKey,
        })
    });
    return await response.json();
}

const EventService = {
    getEvents,
};

export default EventService;