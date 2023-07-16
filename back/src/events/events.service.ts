import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Event} from './event.interface';

@Injectable()
export class EventsService {

  constructor(@InjectModel('Event') private eventModel: Model<Event>) {}

  async createEvent(eventDto: any): Promise<Event> {
    const createdEvent = new this.eventModel(eventDto);
    try {
      return await createdEvent.save();
    } catch (err) {
      throw new InternalServerErrorException('Failed to create event', err.message);
    }
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      return await this.eventModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException('Failed to get events', err.message);
    }
  }


}