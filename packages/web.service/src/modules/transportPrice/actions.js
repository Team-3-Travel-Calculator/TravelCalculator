import { TransportPriceAlreadyExistsError } from './errors';
import { TransportPriceModel } from './schema';

export const getTransportPricePresenceAction = (
  calculationType,
  transportType,
  seasonType,
  comfortLevel
) => TransportPriceModel.findOne({ calculationType, transportType, seasonType, comfortLevel });

export const createTransportPriceAction = async (
  calculationType,
  transportType,
  seasonType,
  comfortLevel,
  price
) => {
  if (
    await getTransportPricePresenceAction(calculationType, transportType, seasonType, comfortLevel)
  ) {
    return Promise.reject(new TransportPriceAlreadyExistsError());
  }
  return TransportPriceModel.create({
    calculationType,
    transportType,
    seasonType,
    comfortLevel,
    price,
  });
};

export const getAllTransportPricesAction = () => TransportPriceModel.find();

export const getTransportPriceByIdAction = (id) => TransportPriceModel.findById(id);

export const updateTransportPriceAction = (id, transportPrice) =>
  TransportPriceModel.findByIdAndUpdate(
    id,
    {
      $set: {
        calculationType: transportPrice.calculationType,
        transportType: transportPrice.transportType,
        seasonType: transportPrice.seasonType,
        comfortLevel: transportPrice.comfortLevel,
        price: transportPrice.price,
      },
    },
    { runValidators: true, new: true }
  );

export const deleteTransportPriceAction = (id) => TransportPriceModel.findByIdAndDelete(id);
