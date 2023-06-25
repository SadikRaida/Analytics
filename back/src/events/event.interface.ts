import { Document } from 'mongoose';

export interface Event extends Document {
    readonly data: Record<string, any>;
}