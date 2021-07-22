import { model, Schema } from 'mongoose';

import type { Service } from '../service';
import { ComfortLevels, GuideTypes, ServiceTypes, TransportTypes } from '../service';

export type TourDayService = Service & {
  readonly dayNumber: number;
  readonly date: Date;
  readonly serviceStartTime: string;
};

const discriminator = {
  discriminatorKey: 'type',
};

const dayServiceSchema = new Schema(
  {
    dayNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    serviceStartTime: { type: String, required: true },
  },
  discriminator
);
const TourDayServiceModel = model('TourDayService', dayServiceSchema);

const serviceTransferSchema = new Schema(
  {
    transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    transfersNumber: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceTransferModel = TourDayServiceModel.discriminator(
  ServiceTypes.Transfer,
  serviceTransferSchema
);

const serviceHourlyTransportSchema = new Schema(
  {
    transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    workHoursNumber: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceHourlyTransportModel = TourDayServiceModel.discriminator(
  ServiceTypes.HourlyTransport,
  serviceHourlyTransportSchema
);

const serviceGuideSchema = new Schema(
  {
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    guideType: { type: Number, enum: Object.values(GuideTypes), required: true },
    workHoursNumber: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceGuideModel = TourDayServiceModel.discriminator(
  ServiceTypes.Guide,
  serviceGuideSchema
);

const serviceHotelAccommodationSchema = new Schema(
  {
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    hotelType: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    hotelName: { type: String, required: true },
    tripleRoomingCount: { type: Number },
    doubleRoomingCount: { type: Number, required: true },
    singleRoomingCount: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceHotelAccommodationModel = TourDayServiceModel.discriminator(
  ServiceTypes.HotelAccommodation,
  serviceHotelAccommodationSchema
);

const serviceMealSchema = new Schema(
  {
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    restaurantName: { type: String, required: true },
    mealType: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
    mealsNumber: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceMealModel = TourDayServiceModel.discriminator(
  ServiceTypes.Meal,
  serviceMealSchema
);

const serviceVisitSchema = new Schema(
  {
    location: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    locationPhoto: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceVisitModel = TourDayServiceModel.discriminator(
  ServiceTypes.Visit,
  serviceVisitSchema
);
