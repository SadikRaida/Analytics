import {ServicesBases} from "./servicesBases.ts";

const getEvents = async ():Promise<Event[]> => {
    const response = await fetch(ServicesBases.apiUrl + '/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

const EventService = {
    getEvents,
};

export default EventService;