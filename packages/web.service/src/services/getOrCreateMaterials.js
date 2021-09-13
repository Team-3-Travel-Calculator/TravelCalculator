import { logger } from '../logger';
import { ClientCompanyModel, ClientIndividualModel } from '../modules/client';
import { ComfortLevels } from '../modules/comfortLevel';
import { GuidePriceModel } from '../modules/guidePrice';
import { GuideGroupSizes, GuideTypes, WorkTermTypes } from '../modules/guideTypes';
import { HotelPriceModel } from '../modules/hotelPrice';
import { HotelTypes, RoomTypes } from '../modules/hotelType';
import { LocationModel } from '../modules/location';
import { MealPriceModel } from '../modules/mealPrice';
import { MealTypes } from '../modules/mealType';
import { PersonsNumbers } from '../modules/personsNumber';
import { PersonTypes } from '../modules/personType';
import { Regions } from '../modules/region';
import { SeasonTypes } from '../modules/season';
import { TransportPriceModel } from '../modules/transportPrice';
import { TransportCalculationTypes, TransportTypes } from '../modules/transportType';
import { TransportTypeNumberModel } from '../modules/transportTypeNumber';
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
      roomType: RoomTypes.Double,
      price: '13000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.Low,
      comfortLevel: ComfortLevels.Economy,
      roomType: RoomTypes.Double,
      price: '12000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Standard,
      roomType: RoomTypes.Double,
      price: '16000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.Low,
      comfortLevel: ComfortLevels.Standard,
      roomType: RoomTypes.Double,
      price: '15000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Comfort,
      roomType: RoomTypes.Double,
      price: '19000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }
  if (await checkCountInSchema(HotelPriceModel)) {
    await HotelPriceModel.create({
      hotelType: HotelTypes.ThreeStars,
      seasonType: SeasonTypes.Low,
      comfortLevel: ComfortLevels.Comfort,
      roomType: RoomTypes.Double,
      price: '18000',
    });
    LoadLogger.info(`created materials at HotelPriceModel`);
  }

  if (await checkCountInSchema(LocationModel)) {
    await LocationModel.create({
      location: 'Урочище Медео',
      region: Regions.Almaty,
      hoursToVisit: '1,2',
      photo: ['nS8SMJoeCZZ8ogcIR6ive.jpg', 'ykYJsoQUOCCDDg2rDUu6I.jpg'],
    });
    LoadLogger.info(`created materials at LocationModel`);
  }

  if (await checkCountInSchema(LocationModel)) {
    await LocationModel.create({
      location: 'Спортивный комплекс Медео',
      region: Regions.Almaty,
      hoursToVisit: '1,2',
      photo: ['dkwhZE69YATqpt6dJhjPD.jpg'],
    });
    LoadLogger.info(`created materials at LocationModel`);
  }

  if (await checkCountInSchema(LocationModel)) {
    await LocationModel.create({
      location: 'Урочище Медео + ГК Шымбулак',
      region: Regions.Almaty,
      hoursToVisit: '2',
      photo: ['9QRFrsL-kACKN6CyeB6Cw.jpg', '_WhkwdNC9qsHYnys6A1zX.jpg'],
    });
    LoadLogger.info(`created materials at LocationModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Economy,
      price: '3500',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Economy,
      price: '3000',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Standard,
      price: '4500',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Standard,
      price: '5000',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '7000',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(MealPriceModel)) {
    await MealPriceModel.create({
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      mealType: MealTypes.Dinner.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '6000',
    });
    LoadLogger.info(`created materials at MealPriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Economy,
      price: '4000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Economy,
      price: '5000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Standard,
      price: '6000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }
  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Standard,
      price: '5000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '6000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }
  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.NoTerm.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '6000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Tour,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Economy,
      price: '8000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Economy,
      price: '9000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Standard,
      price: '10000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }
  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Standard,
      price: '9000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }

  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.High,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '11000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }
  if (await checkCountInSchema(GuidePriceModel)) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      groupSize: GuideGroupSizes.Small,
      seasonType: SeasonTypes.Low,
      workTermType: WorkTermTypes.ShortTerm.code,
      comfortLevel: ComfortLevels.Comfort,
      price: '10000',
    });
    LoadLogger.info(`created materials at GuidePriceModel`);
  }
};

const getOrCreateTransports = async () => {
  const checkTransportType = (number) => TransportPriceModel.findOne({ transportType: number });
  const checkPersonsNumber = (number) =>
    TransportTypeNumberModel.findOne({ personsNumber: number });

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '3000',
    });
    LoadLogger.info(`created materials at TransportPriceModel `);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      price: '3500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.Low,
      price: '4000',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.High,
      price: '4500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.Low,
      price: '5000',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.High,
      price: '5500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }
  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      price: '2000',
    });
    LoadLogger.info(`created materials at TransportPriceModel `);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      price: '2500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.Low,
      price: '2500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.High,
      price: '3500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.Low,
      price: '3500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkTransportType(TransportTypes.Sedan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Sedan,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.High,
      price: '4500',
    });
    LoadLogger.info(`created materials at TransportPriceModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel `);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.Transfer,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel `);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Standard,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.Low,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }

  if (!(await checkPersonsNumber(PersonsNumbers.Two))) {
    await TransportTypeNumberModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      personsNumber: PersonsNumbers.Two,
      comfortLevel: ComfortLevels.Comfort,
      seasonType: SeasonTypes.High,
      transportTypeCount: [
        { type: TransportTypes.Sedan, number: 1 },
        {
          type: TransportTypes.Minivan,
          number: 1,
        },
        { type: TransportTypes.Jeep, number: 1 },
      ],
    });
    LoadLogger.info(`created materials at TransportTypeNumberModel`);
  }
};

const getOrCreateSchemaWithLocation = async () => {
  const locationFirst = await LocationModel.findOne({ location: 'Урочище Медео' });
  const locationSecond = await LocationModel.findOne({ location: 'Спортивный комплекс Медео' });
  const locationThird = await LocationModel.findOne({ location: 'Урочище Медео + ГК Шымбулак' });
  if (locationFirst && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationFirst.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      price: '0',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }
  if (locationFirst && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationFirst.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      price: '0',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }

  if (locationSecond && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationSecond.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      price: '1800',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }
  if (locationSecond && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationSecond.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      price: '1800',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }

  if (locationThird && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationThird.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.Low,
      price: '4000',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }
  if (locationThird && (await checkCountInSchema(VisitPriceModel))) {
    await VisitPriceModel.create({
      visitLocation: locationThird.id,
      personType: PersonTypes.Adult,
      seasonType: SeasonTypes.High,
      price: '4500',
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
