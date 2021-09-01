import { LocationModel } from '../location';
import { LocationNotFoundError, VisitPriceAlreadyExistsError } from './errors';
import { VisitPriceModel } from './schema';

export const getVisitLocationAction = (visitLocation) => LocationModel.findById(visitLocation);
export const getVisitPricePresenceAction = (visitLocation, personType, seasonType) =>
  VisitPriceModel.findOne({
    visitLocation,
    personType,
    seasonType,
  });

export const createVisitPriceAction = async (visitLocation, personType, seasonType, price) => {
  if (await getVisitLocationAction(visitLocation)) {
    if (await getVisitPricePresenceAction(visitLocation, personType, seasonType)) {
      return Promise.reject(new VisitPriceAlreadyExistsError());
    }
    return VisitPriceModel.create({
      visitLocation,
      personType,
      seasonType,
      price,
    });
  }
  return Promise.reject(new LocationNotFoundError());
};

export const getAllVisitPricesAction = () => VisitPriceModel.find().populate('visitLocation');

export const getVisitPriceByIdAction = (id) =>
  VisitPriceModel.findById(id).populate('visitLocation');

export const updateVisitPriceAction = (id, visitPrice) =>
  VisitPriceModel.findByIdAndUpdate(
    id,
    {
      $set: {
        visitLocation: visitPrice.visitLocation,
        personType: visitPrice.personType,
        seasonType: visitPrice.seasonType,
        price: visitPrice.price,
      },
    },
    { runValidators: true, new: true }
  );

export const deleteVisitPriceAction = (id) => VisitPriceModel.findByIdAndDelete(id);
