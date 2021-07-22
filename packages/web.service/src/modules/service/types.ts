import type { Location } from '../location';

// TODO: add ComfortLevels enum
export enum ComfortLevels {}

// TODO: add TransportTypes enum
export enum TransportTypes {}

// TODO: add GuideTypes enum
export enum GuideTypes {}

// TODO: add Hotel schema
export type Hotel = {
  readonly hotel: string;
};

// TODO: add Meal schema
export type Meal = {
  readonly meal: string;
};

export enum ServiceTypes {
  Transfer = 1,
  HourlyTransport = 2,
  Guide = 3,
  HotelAccommodation = 4,
  Meal = 5,
  Visit = 6,
}

export type ServiceTransfer = {
  readonly type: ServiceTypes.Transfer;
  readonly transportType: TransportTypes;
  readonly comfortLevel: ComfortLevels;
  readonly transfersNumber: number;
};

export type ServiceHourlyTransport = {
  readonly type: ServiceTypes.HourlyTransport;
  readonly transportType: TransportTypes;
  readonly comfortLevel: ComfortLevels;
  readonly workHoursNumber: string;
};

export type ServiceGuide = {
  readonly type: ServiceTypes.Guide;
  readonly comfortLevel: ComfortLevels;
  readonly guideType: GuideTypes;
  readonly workHoursNumber: string;
};

export type ServiceHotelAccommodation = {
  readonly type: ServiceTypes.HotelAccommodation;
  readonly comfortLevel: ComfortLevels;
  readonly hotelType: Hotel;
  readonly hotelName: string;
  readonly tripleRoomingCount: number;
  readonly doubleRoomingCount: number;
  readonly singleRoomingCount: number;
};

export type ServiceMeal = {
  readonly type: ServiceTypes.Meal;
  readonly comfortLevel: ComfortLevels;
  readonly restaurantName: string;
  readonly mealType: Meal;
  readonly mealsNumber: number;
};

export type ServiceVisit = {
  readonly type: ServiceTypes.Visit;
  readonly location: Location;
  readonly description: string;
  readonly locationPhoto: string;
};

export type Service =
  | ServiceGuide
  | ServiceHotelAccommodation
  | ServiceHourlyTransport
  | ServiceMeal
  | ServiceTransfer
  | ServiceVisit;
