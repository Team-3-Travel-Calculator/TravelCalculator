import { model, Schema } from 'mongoose';

const TourProgramSchema = new Schema({
  name: { type: String, required: true },
  content: [{ type: Schema.Types.ObjectId, ref: 'TourDayService', required: true }],
});

export const TourModel = model('TourProgram', TourProgramSchema);
