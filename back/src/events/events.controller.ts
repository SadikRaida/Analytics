import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() event: any) {
    return this.eventsService.createEvent(event);
  }

 //EXEMPLE D'ACCES ADMIN ONLY @UseGuards(JwtAuthGuard, new RolesGuard(Role.Admin))
  @Get()
  async getAllEvents() {
    const events = await this.eventsService.getAllEvents();
    return events.map(event => event.data);
  }
}
