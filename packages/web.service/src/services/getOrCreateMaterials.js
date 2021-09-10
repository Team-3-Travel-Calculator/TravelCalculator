import { logger } from '../logger';
import { ClientCompanyModel, ClientIndividualModel } from '../modules/client';
import { ComfortLevels } from '../modules/comfortLevel';
import { GuideModel } from '../modules/guide';
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
      seasonType: SeasonTypes.High,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Sedan`);
  }

  if (!(await checkTransportType(TransportTypes.Minivan))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Minivan,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Minivan`);
  }

  if (!(await checkTransportType(TransportTypes.Minibus))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Minibus,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Minibus`);
  }

  if (!(await checkTransportType(TransportTypes.Bus))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Bus,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
      price: '15000',
    });
    LoadLogger.info(`created materials at TransportPriceModel with type Bus`);
  }

  if (!(await checkTransportType(TransportCalculationTypes.HourlyTransport))) {
    await TransportPriceModel.create({
      calculationType: TransportCalculationTypes.HourlyTransport,
      transportType: TransportTypes.Jeep,
      comfortLevel: ComfortLevels.Economy,
      seasonType: SeasonTypes.High,
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
      seasonType: SeasonTypes.High,
      price: '10000',
    });
    LoadLogger.info(`created materials at VisitPriceModel`);
  }
};

const getOrCreateSchemaGuide = async () => {
  const checkGuideType = (number) =>
    GuideModel.findOne({
      guidesList: [
        {
          type: number,
        },
      ],
    });
  const clientJohn = await ClientIndividualModel.findOne({ email: 'johnDoe@gmail.com' });
  if (clientJohn) {
    if (!(await checkGuideType(GuideTypes.Transfer))) {
      await GuideModel.create({
        client: clientJohn.id,
        workDate: '07/02/2021',
        seasonType: SeasonTypes.High,
        comfortLevel: ComfortLevels.Economy,
        guidesList: [
          {
            type: GuideTypes.Transfer,
            number: 3,
            personsNumber: PersonsNumbers.Three,
            workHours: '2 hours',
            name: 'Small group',
          },
        ],
        totalPrice: '35000',
      });
      LoadLogger.info(`created materials at GuideModel with type Transfer`);
    }

    if (!(await checkGuideType(GuideTypes.Tour))) {
      await GuideModel.create({
        client: clientJohn.id,
        workDate: '07/02/2021',
        seasonType: SeasonTypes.High,
        comfortLevel: ComfortLevels.Economy,
        guidesList: [
          {
            type: GuideTypes.Tour,
            number: 3,
            personsNumber: PersonsNumbers.Three,
            workHours: '2 hours',
            name: 'Small group',
          },
        ],
        totalPrice: '35000',
      });

      LoadLogger.info(`created materials at GuideModel with type Tour`);
    }

    if (!(await checkGuideType(GuideTypes.Instructor))) {
      await GuideModel.create({
        client: clientJohn.id,
        workDate: '07/02/2021',
        seasonType: SeasonTypes.High,
        comfortLevel: ComfortLevels.Economy,
        guidesList: [
          {
            type: GuideTypes.Instructor,
            number: 3,
            personsNumber: PersonsNumbers.Three,
            workHours: '2 hours',
            name: 'Small group',
          },
        ],
        totalPrice: '35000',
      });
      LoadLogger.info(`created materials at GuideModel with type Instructor`);
    }

    if (!(await checkGuideType(GuideTypes.SkiInstructor))) {
      await GuideModel.create({
        client: clientJohn.id,
        workDate: '07/02/2021',
        seasonType: SeasonTypes.High,
        comfortLevel: ComfortLevels.Economy,
        guidesList: [
          {
            type: GuideTypes.SkiInstructor,
            number: 3,
            personsNumber: PersonsNumbers.Three,
            workHours: '2 hours',
            name: 'Small group',
          },
        ],
        totalPrice: '35000',
      });
      LoadLogger.info(`created materials at GuideModel with type SkiInstructor`);
    }
  }
};

const getOrCreateGuidePrice = async () => {
  const checkGuidePriceType = (number) => GuidePriceModel.findOne({ guideType: number });
  if (!(await checkGuidePriceType(GuideTypes.Transfer))) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Transfer,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Economy,
      groupSize: GuideGroupSizes.Medium.code,
      workTermType: WorkTermTypes.MidTerm.code,
      price: '15000',
    });
    LoadLogger.info(`created materials at GuidePriceModel with type Transfer`);
  }

  if (!(await checkGuidePriceType(GuideTypes.Tour))) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Tour,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Economy,
      groupSize: GuideGroupSizes.Medium.code,
      workTermType: WorkTermTypes.MidTerm.code,
      price: '15000',
    });
    LoadLogger.info(`created materials at GuidePriceModel with type Tour`);
  }

  if (!(await checkGuidePriceType(GuideTypes.Instructor))) {
    await GuidePriceModel.create({
      guideType: GuideTypes.Instructor,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Economy,
      groupSize: GuideGroupSizes.Medium.code,
      workTermType: WorkTermTypes.MidTerm.code,
      price: '15000',
    });
    LoadLogger.info(`created materials at GuidePriceModel with type Instructor`);
  }

  if (!(await checkGuidePriceType(GuideTypes.SkiInstructor))) {
    await GuidePriceModel.create({
      guideType: GuideTypes.SkiInstructor,
      seasonType: SeasonTypes.High,
      comfortLevel: ComfortLevels.Economy,
      groupSize: GuideGroupSizes.Medium.code,
      workTermType: WorkTermTypes.MidTerm.code,
      price: '15000',
    });
    LoadLogger.info(`created materials at GuidePriceModel with type SkiInstructor`);
  }
};

export const getOrCreateMaterials = async () => {
  await getOrCreateClients();
  await getOrCreateSchemaInfo();
  await getOrCreateTransports();
  await getOrCreateSchemaWithLocation();
  await getOrCreateSchemaGuide();
  await getOrCreateGuidePrice();
};
