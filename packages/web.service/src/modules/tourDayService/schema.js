import { model, Schema } from 'mongoose';

import { ServiceTypes } from '../service';

// TODO: add correct imports of HotelTypes, MealTypes, TransportTypes,ComfortLevels, GuideTypes
const HotelTypes = {};
const MealTypes = {};
const TransportTypes = {};
const ComfortLevels = {};
const GuideTypes = {};

const discriminator = {
  discriminatorKey: 'type',
};

const DayServiceSchema = new Schema(
  {
    dayNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    serviceStartTime: { type: String, required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  },
  discriminator
);
const TourDayServiceModel = model('TourDayService', DayServiceSchema);

const ServiceTransferSchema = new Schema(
  {
    transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
    transfersNumber: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceTransferModel = TourDayServiceModel.discriminator(
  ServiceTypes.Transfer,
  ServiceTransferSchema
);

const ServiceHourlyTransportSchema = new Schema(
  {
    transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
    workHoursNumber: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceHourlyTransportModel = TourDayServiceModel.discriminator(
  ServiceTypes.HourlyTransport,
  ServiceHourlyTransportSchema
);

const ServiceGuideSchema = new Schema(
  {
    guideType: { type: Number, enum: Object.values(GuideTypes), required: true },
    workHoursNumber: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceGuideModel = TourDayServiceModel.discriminator(
  ServiceTypes.Guide,
  ServiceGuideSchema
);

const ServiceHotelAccommodationSchema = new Schema(
  {
    hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
    hotelName: { type: String, required: true },
    tripleRoomingCount: { type: Number, required: true, default: 0 },
    doubleRoomingCount: { type: Number, required: true },
    singleRoomingCount: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceHotelAccommodationModel = TourDayServiceModel.discriminator(
  ServiceTypes.HotelAccommodation,
  ServiceHotelAccommodationSchema
);

const ServiceMealSchema = new Schema(
  {
    restaurantName: { type: String, required: true },
    mealType: { type: Number, enum: Object.values(MealTypes), required: true },
    mealsNumber: { type: Number, required: true },
  },
  discriminator
);
export const TourDayServiceMealModel = TourDayServiceModel.discriminator(
  ServiceTypes.Meal,
  ServiceMealSchema
);

const ServiceVisitSchema = new Schema(
  {
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    description: { type: String, required: true },
    locationPhoto: { type: String, required: true },
  },
  discriminator
);
export const TourDayServiceVisitModel = TourDayServiceModel.discriminator(
  ServiceTypes.Visit,
  ServiceVisitSchema
);
