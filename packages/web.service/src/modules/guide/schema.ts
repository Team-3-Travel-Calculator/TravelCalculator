import { model, Schema } from 'mongoose';

// TODO: add Season enum
enum Season {}

// TODO: add Type enum
enum Type {}

// TODO: add RawPrice type from Visit schema
type RawPrice = {
  readonly price: string;
};

export enum GuideGroupSize {
  Small = 5,
  Medium = 15,
  Large = 50,
}

export enum GuideTypes {
  Transfer = 1,
  Tour = 2,
  Instructor = 3,
  SkiInstructor = 4,
}

export type GuideTransfer = {
  readonly type: GuideTypes.Transfer;
};

export type GuideTour = {
  readonly type: GuideTypes.Tour;
  readonly workTime: string;
};

export type GuideInstructor = {
  readonly type: GuideTypes.Instructor;
};

export type GuideSkiInstructor = {
  readonly type: GuideTypes.SkiInstructor;
};

export type GuideType = GuideInstructor | GuideSkiInstructor | GuideTour | GuideTransfer;

export type Guide = {
  readonly guideType: GuideType;
  readonly season: Season;
  readonly comfortLevel: Type;
  readonly guideGroupSize: GuideGroupSize;
  readonly totalWorkHours: string;
  readonly price: RawPrice;
};

const schema = new Schema<Guide>({
  guideType: { enum: GuideTypes, required: true },
  season: { enum: Season, required: true },
  comfortLevel: { enum: Type, required: true },
  groupSize: { enum: GuideGroupSize, required: true },
  totalWorkHours: { type: String, required: true },
  price: { type: String, required: true },
});

export const GuideModel = model<Guide>('Guide', schema);
