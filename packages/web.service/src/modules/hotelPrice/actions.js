import { HotelPriceAlreadyExistsError } from './errors';
import { HotelPriceModel } from './schema';

export const getHotelPricePresenceAction = (hotelType, roomType, seasonType, comfortLevel) =>
  HotelPriceModel.findOne({ hotelType, roomType, seasonType, comfortLevel });

export const createHotelPriceAction = async (
  hotelType,
  roomType,
  seasonType,
  comfortLevel,
  price
) => {
  if (await getHotelPricePresenceAction(hotelType, roomType, seasonType, comfortLevel)) {
    return Promise.reject(new HotelPriceAlreadyExistsError());
  }
  return HotelPriceModel.create({ hotelType, roomType, seasonType, comfortLevel, price });
};

export const getAllHotelTypesPricesAction = () => HotelPriceModel.find();

export const getHotelPriceByIdAction = (id) => HotelPriceModel.findById(id);

export const updateHotelPriceAction = (id, hotel) =>
  HotelPriceModel.findByIdAndUpdate(
    id,
    {
      $set: {
        hotelType: hotel.hotelType,
        roomType: hotel.roomType,
        seasonType: hotel.seasonType,
        comfortLevel: hotel.comfortLevel,
        price: hotel.price,
      },
    },
    { runValidators: true, new: true }
  );

export const deleteHotelPriceAction = (id) => HotelPriceModel.findByIdAndDelete(id);
