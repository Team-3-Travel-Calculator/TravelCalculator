import { model, Schema } from 'mongoose';

import { Regions } from '../region';

const LocationSchema = new Schema({
  location: { type: String, required: true, unique: true },
  region: { type: Number, enum: Object.values(Regions), required: true },
  hoursToVisit: { type: String, required: true },
  photo: [{ type: String }],
});

export const LocationModel = model('Location', LocationSchema);
