import exactMath from 'exact-math';

import { MealModel } from '../meal';
import { TransportPriceModel } from '../transportPrice';
import { TransportCalculationTypes } from '../transportType';
import { TransportTypeNumberModel } from '../transportTypeNumber';
import { VisitModel } from '../visit';
import { TransportTypeNotMatchToPersonsError } from './errors';
import { TransportModel } from './schema';

export const getTransportSpentTimeAction = async (
  client,
  transportationDate,
  comfortLevel,
  seasonType,
  calculationType
) => {
  if (calculationType === TransportCalculationTypes.HourlyTransport) {
    const meal = await MealModel.findOne({
      client,
      mealDate: transportationDate,
      comfortLevel,
      seasonType,
    });
    const visit = await VisitModel.findOne({
      client,
      attendanceDate: transportationDate,
      orderedSeasonType: seasonType,
    });

    if (meal && visit) {
      return exactMath.add(meal.totalMealSpentTime, visit.totalSpentTime);
    } else if (visit) {
      return visit.totalSpentTime;
    }
    return meal.totalMealSpentTime;
  }
  return 'N/M';
};

export const getTransportTypeNumberAction = async (
  personsNumber,
  calculationType,
  seasonType,
  comfortLevel,
  transportType
) => {
  const transportNumber = await TransportTypeNumberModel.findOne({
    personsNumber,
    calculationType,
    seasonType,
    comfortLevel,
  });
  return transportNumber.transportTypeCount.filter((type) => type.type === Number(transportType));
};

export const getTransportTotalPriceAction = async (
  client,
  transportationDate,
  transportService,
  transportTypeNumber
) => {
  const workTime = await getTransportSpentTimeAction(
    client,
    transportationDate,
    transportService.comfortLevel,
    transportService.seasonType,
    transportService.calculationType
  );

  const transportTypePrice = await TransportPriceModel.findOne({
    transportType: transportService.transportType,
    seasonType: transportService.seasonType,
    comfortLevel: transportService.comfortLevel,
    calculationType: transportService.calculationType,
  });

  if (transportService.calculationType === TransportCalculationTypes.HourlyTransport) {
    return {
      workTime,
      total: exactMath
        .mul(transportTypePrice.price, workTime, transportTypeNumber[0].number)
        .toFixed(0),
    };
  }
  return {
    workTime: 'N/M',
    ridesCount: transportService.ridesCount,
    total: exactMath
      .mul(transportTypePrice.price, transportTypeNumber[0].number, transportService.ridesCount)
      .toFixed(0),
  };
};

export const createTransportServiceAction = async (
  client,
  transportationDate,
  transportService
) => {
  const transportTypeNumber = await getTransportTypeNumberAction(
    transportService.personsNumber,
    transportService.calculationType,
    transportService.seasonType,
    transportService.comfortLevel,
    transportService.transportType
  );
  if (transportTypeNumber && transportTypeNumber.length === 0) {
    return Promise.reject(new TransportTypeNotMatchToPersonsError());
  }
  return getTransportTotalPriceAction(
    client,
    transportationDate,
    transportService,
    transportTypeNumber
  ).then((totalData) => {
    TransportModel.create({
      client,
      transportationDate,
      personsNumber: transportService.personsNumber,
      seasonType: transportService.seasonType,
      comfortLevel: transportService.comfortLevel,
      calculationType: transportService.calculationType,
      transportType: transportService.transportType,
      transportTypeNumber: transportTypeNumber[0].number,
      ridesCount: totalData.ridesCount,
      workHours: totalData.workTime,
      totalPrice: totalData.total,
    });
  });
};

export const getAllTransportServicesAction = () =>
  TransportModel.find().populate({ path: 'client' });

export const getTransportServiceByIdAction = (id) =>
  TransportModel.findById(id).populate({ path: 'client' });

export const updateTransportServiceAction = async (
  id,
  client,
  transportationDate,
  transportService
) => {
  const transportTypeNumber = await getTransportTypeNumberAction(
    transportService.personsNumber,
    transportService.calculationType,
    transportService.seasonType,
    transportService.comfortLevel,
    transportService.transportType
  );
  return getTransportTotalPriceAction(
    client,
    transportationDate,
    transportService,
    transportTypeNumber
  ).then((totalData) =>
    TransportModel.findByIdAndUpdate(
      id,
      {
        $set: {
          client,
          transportationDate,
          personsNumber: transportService.personsNumber,
          seasonType: transportService.seasonType,
          comfortLevel: transportService.comfortLevel,
          calculationType: transportService.calculationType,
          transportType: transportService.transportType,
          transportTypeNumber: transportTypeNumber[0].number,
          ridesCount: totalData.ridesCount,
          workHours: totalData.workTime,
          totalPrice: totalData.total,
        },
      },
      { runValidators: true, new: true }
    )
  );
};

export const deleteTransportServiceAction = (id) => TransportModel.findByIdAndDelete(id);
