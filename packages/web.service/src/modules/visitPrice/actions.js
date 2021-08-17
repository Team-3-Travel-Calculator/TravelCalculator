import { LocationModel } from '../location';
import { LocationNotFoundError, VisitPriceNotFoundError, VisitPriceWasCreatedError } from './error';
import { VisitPriceModel } from './schema';

const getVisitLocationAction = (location) => LocationModel.findById(location);

export const createVisitPriceAction = async (visitLocation, personType, season, price) => {
  if (await getVisitLocationAction(visitLocation)) {
    if (
      await VisitPriceModel.findOne({
        $or: [
          {
            visitLocation,
            personType,
            season,
            price,
          },
        ],
      })
    ) {
      return Promise.reject(new VisitPriceWasCreatedError());
    }
    return VisitPriceModel.create({
      visitLocation,
      personType,
      season,
      price,
    });
  }
  return Promise.reject(new LocationNotFoundError());
};

export const getAllVisitPricesAction = () => VisitPriceModel.find().populate('visitLocation');

export const getVisitPriceByIdAction = (id) =>
  VisitPriceModel.findById(id).populate('visitLocation');

export const updateVisitPriceAction = async (id, visitPrice) => {
  if (await getVisitPriceByIdAction(id)) {
    return VisitPriceModel.findByIdAndUpdate(id, {
      visitLocation: visitPrice.visitLocation,
      personType: visitPrice.personType,
      season: visitPrice.season,
      price: visitPrice.price,
    });
  }
  return Promise.reject(new VisitPriceNotFoundError());
};

export const deleteVisitPriceAction = async (id) => {
  if (await getVisitPriceByIdAction(id)) {
    return VisitPriceModel.findByIdAndDelete(id);
  }
  return Promise.reject(new VisitPriceNotFoundError());
};
