import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
    @Prop()
    url: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop()
    shortenUrl: string;

    @Prop()
    shortenId: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);