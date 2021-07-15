import { model, Schema } from 'mongoose';

export enum Types {
  Transfer = 1,
  Tour = 2,
  Instructor = 3,
  SkiInstructor = 4,
}
export type GuideTransfer = {
  readonly type: Types.Transfer;
};

export type TourGuide = {
  readonly type: Types.Tour;
  readonly workTime: number;
};

export type GuideInstructor = {
  readonly type: Types.Instructor;
};

export type SkiInstructorGuide = {
  readonly type: Types.SkiInstructor;
};

export type GuideType = GuideInstructor | GuideTransfer | SkiInstructorGuide | TourGuide;

export const schema = new Schema<GuideType>({
  type: { enum: Types, required: true },
  workTime: { type: Number, nullable: true, default: null },
});

export const GuideTypeModel = model<GuideType>('GuideType', schema);
