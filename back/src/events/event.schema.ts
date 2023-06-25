import { Schema } from 'mongoose';

export const EventSchema = new Schema({
    data: Schema.Types.Mixed,
});