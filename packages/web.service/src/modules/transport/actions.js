import exactMath from 'exact-math';

import { MealModel } from '../meal';
import { TransportPriceModel } from '../transportPrice';
import { TransportCalculationTypes } from '../transportType';
import { TransportTypeNumberModel } from '../transportTypeNumber';
import { TransportTypeNotMatchToPersonsError } from './errors';
import { TransportModel } from './schema';

export const getTransportSpentTimeAction = async (
  client,
  date,
  comfortLevel,
  seasonType,
  calculationType
) => {
  if (calculationType === TransportCalculationTypes.HourlyTransport) {
    const meal = await MealModel.findOne({ client, mealDate: date, comfortLevel, seasonType });

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
  date,
  transportService,
  transportTypeNumber
) => {
  const workTime = await getTransportSpentTimeAction(
    client,
    date,
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
    total: exactMath.mul(transportTypePrice.price, transportTypeNumber[0].number).toFixed(0),
  };
};

export const createTransportServiceAction = async (client, transportService) => {
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
  const date = new Date().toLocaleDateString();
  return getTransportTotalPriceAction(client, date, transportService, transportTypeNumber).then(
    (totalData) =>
      TransportModel.create({
        client,
        transportationDate: date,
        personsNumber: transportService.personsNumber,
        seasonType: transportService.seasonType,
        comfortLevel: transportService.comfortLevel,
        calculationType: transportService.calculationType,
        transportType: transportService.transportType,
        transportTypeNumber: transportTypeNumber[0].number,
        workHours: totalData.workTime,
        totalPrice: totalData.total,
      })
  );
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
          workHours: totalData.workTime,
          totalPrice: totalData.total,
        },
      },
      { runValidators: true, new: true }
    )
  );
};

export const deleteTransportServiceAction = (id) => TransportModel.findByIdAndDelete(id);
