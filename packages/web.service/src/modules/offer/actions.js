import exactMath from 'exact-math';

import { getClientByIdAction } from '../client';
import { GuideModel } from '../guide';
import { HotelModel } from '../hotel';
import { MealModel } from '../meal';
import { TransportModel } from '../transport';
import { TransportCalculationTypes } from '../transportType';
import { VisitModel } from '../visit';
import { ClientNotFoundError } from './errors';
import { OfferModel } from './schema';

export const getOrderIdAction = async () => {
  const last = await OfferModel.find({}, { orderId: 1 }).sort({ orderId: -1 }).limit(1);
  if (last.length > 0) {
    return Number(last[0].orderId) + 1;
  }
  return 1;
};

export const getAllServicesData = (client, offerData) =>
  Promise.all(
    offerData.tourPeriod.map(async (date) => {
      const mealTotal = await MealModel.findOne({ client, mealDate: date });
      const visitTotal = await VisitModel.findOne({ client, attendanceDate: date });
      const transportTotal = await TransportModel.find({
        client,
        transportationDate: date,
      });
      const guideTotal = await GuideModel.findOne({ client, workDate: date });
      const hotelTotal = await HotelModel.findOne({ client, stayDate: date });
      return {
        date,
        mealTotal,
        visitTotal,
        transfer: transportTotal.filter(
          (type) => type.calculationType !== TransportCalculationTypes.HourlyTransport || null
        ),
        hourlyTransport: transportTotal.filter(
          (type) => type.calculationType === TransportCalculationTypes.HourlyTransport || null
        ),
        guideTotal,
        hotelTotal,
      };
    })
  );

export const getOfferTotalPriceAction = async (client, offerData) => {
  const totalServices = await getAllServicesData(client, offerData);
  const total = totalServices.map((service) =>
    exactMath.add(
      (service.visitTotal && service.visitTotal.totalPrice) || 0,
      (service.mealTotal && service.mealTotal.totalPrice) || 0,
      (service.hotelTotal && service.hotelTotal.totalPrice) || 0,
      (service.guideTotal && service.guideTotal.totalPrice) || 0,
      service.hourlyTransport.reduce((sum, value) => sum + Number(value.totalPrice), 0),
      service.transfer.reduce((sum, value) => sum + Number(value.totalPrice), 0)
    )
  );

  return { total: total.reduce((sum, value) => sum + value).toFixed(0), tourData: totalServices };
};

export const createOfferAction = async (client, offerData, conditions) => {
  const clientCheck = await getClientByIdAction(client);
  if (!clientCheck) {
    return Promise.reject(new ClientNotFoundError());
  }
  const calculationDate = new Date().toLocaleDateString();

  return getOfferTotalPriceAction(client, offerData).then(async (totalData) => {
    const tourProgram = totalData.tourData.map((date) => ({
      date: date.date,
      meal: (date.mealTotal && date.mealTotal) || {},
      hotel: (date.hotelTotal && date.hotelTotal) || {},
      transfer: (date.transfer && date.transfer) || [],
      hourlyTransport: (date.hourlyTransport && date.hourlyTransport) || [],
      visit: (date.visitTotal && date.visitTotal) || {},
      guides: (date.guideTotal && date.guideTotal) || {},
    }));

    const orderId = await getOrderIdAction();
    return OfferModel.create({
      orderId,
      client,
      calculationDate,
      tourPeriod: offerData.tourPeriod,
      personsNumber: offerData.personsNumber,
      offerAuthor: offerData.offerAuthor,
      tourProgram: {
        name: offerData.tourProgram.name,
        tour: tourProgram,
      },
      conditions,
      totalPrice: totalData.total,
    });
  });
};

export const getAllOffersAction = () => OfferModel.find().populate({ path: 'client' });

export const getOfferByIdAction = (id) => OfferModel.findById(id).populate({ path: 'client' });

export const updateOfferAction = (id, client, orderId, offerData, conditions) =>
  getOfferTotalPriceAction(client, offerData).then((totalData) =>
    OfferModel.findByIdAndUpdate(
      id,
      {
        $set: {
          client,
          calculationDate: offerData.calculationDate,
          orderId,
          personsNumber: offerData.personsNumber,
          offerAuthor: offerData.offerAuthor,
          tourPeriod: offerData.tourPeriod,
          tourProgram: {
            name: offerData.tourProgram.name,
            tour: totalData.tour,
          },
          conditions,
          totalPrice: totalData.total,
        },
      },
      { runValidators: true, new: true }
    )
  );

export const deleteOfferAction = (id) => OfferModel.findByIdAndDelete(id);
