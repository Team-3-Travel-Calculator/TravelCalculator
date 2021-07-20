import { Schema, model } from 'mongoose';

export enum SeasonType {
    high = 1,
    low = 2
}

export interface Season {
    readonly type: SeasonType;
    readonly month_start: string;
    readonly month_end: string;
}

export const schema = new Schema<Season>({
    title: { type: Number, required: true },
    month_start: { type: String, required: true },
    month_end: { type: String, required: true }
});

const SeasonModel = model<Season>('Season', schema);
module.exports = SeasonModel;