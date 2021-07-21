import { model, Schema } from 'mongoose';

// TODO: add Type enum
enum Type {}

// TODO: add TransportType enum
enum TransportType {}

// TODO: add GuideTypes enum
enum GuideTypes {}

// TODO: add Hotel schema
type Hotel = {
  readonly hotel: string;
};

// TODO: add Meal schema
type Meal = {
  readonly meal: string;
};

// TODO: add Visit schema
type Location = {
  readonly location: string;
};

export enum ServiceTypes {
  Transfer = 1,
  HourlyTransport = 2,
  Guide = 3,
  HotelAccommodation = 4,
  Meal = 5,
  Visit = 6,
}

export type TourDayServiceBase = {
  readonly tourDayNumber: number;
  readonly tourDate: Date;
  readonly serviceType: ServiceTypes;
  readonly serviceStartTime: string;
  readonly serviceEndTime: string;
};

export type ServiceTransfer = TourDayServiceBase & {
  readonly type: ServiceTypes.Transfer;
  readonly transportType: TransportType;
  readonly comfortLevel: Type;
  readonly transfersNumber: number;
};

export type ServiceHourlyTransport = TourDayServiceBase & {
  readonly type: ServiceTypes.HourlyTransport;
  readonly transportType: TransportType;
  readonly comfortLevel: Type;
  readonly workHoursNumber: string;
};

export type ServiceGuide = TourDayServiceBase & {
  readonly type: ServiceTypes.Guide;
  readonly comfortLevel: Type;
  readonly guideType: GuideTypes;
  readonly workHoursNumber: string;
};

export type RoomingData = {
  readonly tripleRoomCount: number;
  readonly doubleRoomCount: number;
  readonly singleRoomCount: number;
};

export type ServiceHotelAccommodation = TourDayServiceBase & {
  readonly type: ServiceTypes.HotelAccommodation;
  readonly comfortLevel: Type;
  readonly hotelType: Hotel;
  readonly hotelName: string;
  readonly rooming: RoomingData;
};

export type ServiceMeal = TourDayServiceBase & {
  readonly type: ServiceTypes.Meal;
  readonly comfortLevel: Type;
  readonly restaurantName: string;
  readonly mealType: Meal;
  readonly mealsNumber: number;
};

export type ServiceVisit = TourDayServiceBase & {
  readonly type: ServiceTypes.Visit;
  readonly location: Location;
  readonly description: string;
  readonly locationPhoto: string;
};

export type DayService =
  | ServiceGuide
  | ServiceHotelAccommodation
  | ServiceHourlyTransport
  | ServiceMeal
  | ServiceTransfer
  | ServiceVisit;

export type TourProgram = {
  readonly programName: string;
  readonly programContent: readonly DayService[];
};

const dayService = new Schema(
  {
    tourDayNumber: { type: Number, required: true },
    tourDate: { type: Date, required: true },
    serviceType: { enum: ServiceTypes, required: true },
    serviceStartTime: { type: String, required: true },
    serviceEndTime: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
const TourDayService = model('TourDayService', dayService);

const serviceTransfer = new Schema(
  {
    transportType: { enum: TransportType, required: true },
    comfortLevel: { enum: Type, required: true },
    transfersNumber: { type: Number, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceTransfer = TourDayService.discriminator(
  ServiceTypes.Transfer,
  serviceTransfer
);

const serviceHourlyTransport = new Schema(
  {
    transportType: { enum: TransportType, required: true },
    comfortLevel: { enum: Type, required: true },
    workHoursNumber: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceHourlyTransport = TourDayService.discriminator(
  ServiceTypes.HourlyTransport,
  serviceHourlyTransport
);

const serviceGuide = new Schema(
  {
    comfortLevel: { enum: Type, required: true },
    guideType: { enum: GuideTypes, required: true },
    workHoursNumber: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceGuide = TourDayService.discriminator(ServiceTypes.Guide, serviceGuide);

const serviceHotelAccommodation = new Schema(
  {
    comfortLevel: { enum: Type, required: true },
    hotelType: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    hotelName: { type: String, required: true },
    rooming: { type: Object, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceHotelAccommodation = TourDayService.discriminator(
  ServiceTypes.HotelAccommodation,
  serviceHotelAccommodation
);

const serviceMeal = new Schema(
  {
    comfortLevel: { enum: Type, required: true },
    restaurantName: { type: String, required: true },
    mealType: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
    mealsNumber: { type: Number, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceMeal = TourDayService.discriminator(ServiceTypes.Meal, serviceMeal);

const serviceVisit = new Schema(
  {
    location: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    locationPhoto: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const TourDayServiceVisit = TourDayService.discriminator(ServiceTypes.Visit, serviceVisit);

const program = new Schema<TourProgram>({
  name: { type: String, required: true },
  content: [{ type: Object, required: true }],
});

export const Program = model('TourProgram', program);
