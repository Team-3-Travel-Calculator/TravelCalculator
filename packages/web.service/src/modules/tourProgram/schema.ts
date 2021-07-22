import { model, Schema } from 'mongoose';

import type { TourDayService } from '../tourDayService';

export type TourProgram = {
  readonly name: string;
  readonly content: readonly TourDayService[];
};
const tourProgramSchema = new Schema<TourProgram>({
  name: { type: String, required: true },
  content: [{ type: Object, required: true }],
});

export const TourModel = model('TourProgram', tourProgramSchema);
