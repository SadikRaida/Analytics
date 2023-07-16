import {Body, Controller, Get, InternalServerErrorException, Post} from '@nestjs/common';
import {EventsService} from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Post()
    createEvent(@Body() event: any) {
        return this.eventsService.createEvent(event);
    }

    @Get()
    async getAllEvents(@Body() apiKey: any) {
        try {
            const apikey = apiKey.apikey;
            const events = await this.eventsService.getAllEvents();

            return events.filter(event => event.data.apiKey === apikey);
        } catch (err) {
            throw new InternalServerErrorException('Failed to get events', err.message);
        }
    }
}
