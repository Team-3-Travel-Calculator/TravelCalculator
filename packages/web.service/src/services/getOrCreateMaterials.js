import { logger } from '../logger';
import { ClientCompanyModel, ClientIndividualModel } from '../modules/client';
import { ComfortLevels } from '../modules/comfortLevel';
import { HotelPriceModel } from '../modules/hotelPrice';
import { HotelTypes, RoomTypes } from '../modules/hotelType';
import { LocationModel } from '../modules/location';
import { MealPriceModel } from '../modules/mealPrice';
import { MealTypes } from '../modules/mealType';
import { PersonTypes } from '../modules/personType';
import { Regions } from '../modules/region';
import { SeasonTypes } from '../modules/season';
import { TransportPriceModel } from '../modules/transportPrice';
import { TransportCalculationTypes, TransportTypes } from '../modules/transportType';
import { VisitPriceModel } from '../modules/visitPrice';

const LoadLogger = logger.getLogger('Load');

const getOrCreateClients = async () => {
  if (!(await ClientCompanyModel.findOne({ email: 'marvelsubs@midtowncomics.com' }))) {
    await ClientCompanyModel.create({
      companyName: 'Marvel',
      country: 'US',
      email: 'marvelsubs@midtowncomics.com',
      phone: '888-511-5480',
      language: 'en',
    });
    LoadLogger.info(`created materials at ClientCompanyModel`);
  }

  if (!(await ClientIndividualModel.findOne({ email: 'johnDoe@gmail.com' }))) {
    await ClientIndividualModel.create({
      fullName: 'John Doe',
      country: 'RU',
      email: 'johnDoe@gmail.com',
      phone: '74957556983',
      language: 'ru',
    });
    LoadLogger.info(`created materials at ClientIndividualModel`);
  }
};

const checkCountInSchema = async (schema) => (await schema.countDocuments()) === 0;

const getOrCreateSchemaInfo = async () => {
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Economy,
      roomType: RoomTypes.Triple,
      price: '15000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }

  if (await checkCountInSchema(LocationModel)) {
    await LocationModel.create({
      location: 'Museum',
      region: Regions.Almaty,
      hoursToVisit: '3 hours',
      photo: 'museum.jpg',
    });
    LoadLogger.info(`created materials at LocationModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Driver,
      seasonType: SeasonTypes.High,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Economy,
      price: '6400',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }
};

const getOrCreateTransports = async () => {
  const checkTransportType = (number) => TransportPriceModel.findOne({ transportType: number });

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Sedan`);
  }

  if (!(await checkTransportType(TransportTypes.Minivan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Minivan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Minivan`);
  }

  if (!(await checkTransportType(TransportTypes.Minibus))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Minibus,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Minibus`);
  }

  if (!(await checkTransportType(TransportTypes.Bus))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Bus,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Bus`);
  }

  if (!(await checkTransportType(TransportCalculationTypes.HourlyTransport))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Jeep,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Jeep`);
  }
};

const getOrCreateSchemaWithLocation = async () => {
  const locationMuseum = await LocationModel.findOne({ location: 'Museum' });
  if (locationMuseum && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationMuseum.id,
      personType: PersonTypes.Driver,
      seasonType: SeasonTypes.Low,
      price: '10000',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }
};

export const getOrCreateMaterials = async () => {
  await getOrCreateClients();
  await getOrCreateSchemaInfo();
  await getOrCreateTransports();
  await getOrCreateSchemaWithLocation();
};
