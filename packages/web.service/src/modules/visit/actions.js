import exactMath from 'exact-math';

import { getAllLocationsAction, LocationModel } from '../location';
import { VisitPriceModel } from '../visitPrice';
import { OrderedLocationNotFoundError } from './errors';
import { VisitModel } from './schema';

export const getVisitLocationsAction = (visitors) =>
  Promise.all(visitors.map((visitor) => LocationModel.findById(visitor.orderedLocation)));

export const getVisitTotalSpentTime = async (visitors) => {
  const locations = await getVisitLocationsAction(visitors);
  const locationsArray = locations.map((location) => location.location);
  const uniqueLocations = locationsArray.filter(
    (element, index, array) => array.indexOf(element) === index
  );
  const allLocations = await getAllLocationsAction();
  return allLocations.reduce((sum, current) => {
    if (uniqueLocations.includes(current.location)) {
      return exactMath.add(sum, current.hoursToVisit);
    }
    return sum;
  }, 0);
};

export const getVisitTotalPrice = async (visitors, orderedSeasonType) => {
  const personTypesTotalPrices = await Promise.all(
    visitors.map(async (type) => {
      const visitPrice = await VisitPriceModel.findOne({
        personType: type.personType,
        visitLocation: type.orderedLocation,
        seasonType: orderedSeasonType,
      });
      return exactMath.mul(visitPrice.price, type.count);
    })
  );
  return personTypesTotalPrices.reduce((sum, value) => sum + value).toFixed(0);
};

export const createVisitServiceAction = async (client, visitors, orderedSeasonType) => {
  if (await getVisitLocationsAction(visitors)) {
    const attendanceDate = new Date().toLocaleDateString();
    const totalVisitTime = await getVisitTotalSpentTime(visitors);
    return getVisitTotalPrice(visitors, orderedSeasonType).then((total) => {
      VisitModel.create({
        client,
        attendanceDate,
        visitors,
        orderedSeasonType,
        totalSpentTime: String(totalVisitTime),
        totalPrice: String(total),
      });
    });
  }
  return Promise.reject(new OrderedLocationNotFoundError());
};

export const getVisitServicesAction = () =>
  VisitModel.find()
    .populate({ path: 'client' })
    .populate({ path: 'visitors', populate: { path: 'orderedLocation' } });

export const getVisitServiceByIdAction = (id) =>
  VisitModel.findById(id)
    .populate({ path: 'client' })
    .populate({ path: 'visitors', populate: { path: 'orderedLocation' } });

export const updateVisitServiceAction = async (
  id,
  client,
  attendanceDate,
  visitors,
  orderedSeasonType
) => {
  const totalTime = await getVisitTotalSpentTime(visitors);
  return getVisitTotalPrice(visitors, orderedSeasonType).then((total) =>
    VisitModel.findByIdAndUpdate(
      id,
      {
        $set: {
          client,
          attendanceDate,
          visitors,
          orderedSeasonType,
          totalSpentTime: totalTime,
          totalPrice: total,
        },
      },
      { runValidators: true, new: true }
    )
  );
};

export const deleteVisitServiceAction = (id) => VisitModel.findByIdAndDelete(id);
