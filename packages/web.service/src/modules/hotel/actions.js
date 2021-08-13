import exactMath from 'exact-math';

import { HotelPriceModel } from '../hotelPrice';
import { RoomTypes } from '../hotelType';
import { HotelClientAlreadyExistsError, RoomsNumberNotMatchToPersonsError } from './errors';
import { HotelModel } from './schema';

export const getHotelPresenceAction = (client, stayDate, stayInfo) =>
  HotelModel.findOne({
    client,
    stayDate,
    personsNumber: stayInfo.personsNumber,
    hotelType: stayInfo.hotelType,
    seasonType: stayInfo.seasonType,
    comfortLevel: stayInfo.comfortLevel,
  });

export const getRoomsDistribution = (personsNumber) => {
  if (personsNumber > 1) {
    return Math.ceil(exactMath.div(personsNumber, '2'));
  }
  return 1;
};

export const getHotelTotalPrice = async (
  hotelType,
  seasonType,
  comfortLevel,
  rooms,
  roomsNumber
) => {
  if (!rooms || rooms.length === 0) {
    const roomPrice = await HotelPriceModel.findOne({
      seasonType,
      comfortLevel,
      hotelType,
      roomType: 2,
    });
    return exactMath.mul(roomPrice.price, roomsNumber).toFixed();
  }
  const roomTypesTotalPrices = await Promise.all(
    rooms.map(async ({ type, number }) => {
      const roomTypePrice = await HotelPriceModel.findOne({
        hotelType,
        seasonType,
        comfortLevel,
        roomType: type,
      });
      return exactMath.mul(roomTypePrice.price, number);
    })
  );
  return roomTypesTotalPrices.reduce((sum, value) => sum + value).toFixed(0);
};

export const createHotelServiceAction = async (client, stayInfo) => {
  const stayDate = new Date().toLocaleDateString();
  if (await getHotelPresenceAction(client, stayDate, stayInfo)) {
    return Promise.reject(new HotelClientAlreadyExistsError());
  }
  const roomsNumber = await getRoomsDistribution(stayInfo.personsNumber);
  return getHotelTotalPrice(
    stayInfo.hotelType,
    stayInfo.seasonType,
    stayInfo.comfortLevel,
    roomsNumber
  ).then((total) =>
    HotelModel.create({
      client,
      stayDate,
      hotelType: stayInfo.hotelType,
      personsNumber: stayInfo.personsNumber,
      seasonType: stayInfo.seasonType,
      comfortLevel: stayInfo.comfortLevel,
      rooms: [
        { type: 1, number: 0 },
        { type: 2, number: roomsNumber },
        { type: 3, number: 0 },
      ],
      totalPrice: String(total),
    })
  );
};

export const getAllHotelServicesAction = () => HotelModel.find().populate({ path: 'client' });

export const getHotelServiceByIdAction = (id) =>
  HotelModel.findById(id).populate({ path: 'client' });

export const checkPersonsRoomsNumber = (personsNumber, rooms) => {
  const persons = rooms.map((room) => {
    if (room.type === RoomTypes.Triple) {
      return exactMath.mul(room.number, '3');
    } else if (room.type === RoomTypes.Double) {
      return exactMath.mul(room.number, '2');
    }
    return room.number;
  });
  return persons.reduce((sum, value) => sum + value) === personsNumber;
};

export const updateHotelServiceAction = (id, client, stayDate, stayInfo, rooms) => {
  if (checkPersonsRoomsNumber(stayInfo.personsNumber, rooms) === false) {
    return Promise.reject(new RoomsNumberNotMatchToPersonsError());
  }
  return getHotelTotalPrice(
    stayInfo.hotelType,
    stayInfo.seasonType,
    stayInfo.comfortLevel,
    rooms
  ).then((totalPrice) =>
    HotelModel.findByIdAndUpdate(
      id,
      {
        $set: {
          client,
          stayDate,
          personsNumber: stayInfo.personsNumber,
          hotelType: stayInfo.hotelType,
          seasonType: stayInfo.seasonType,
          comfortLevel: stayInfo.comfortLevel,
          rooms: [
            { type: 1, number: rooms[0].number },
            { type: 2, number: rooms[1].number },
            { type: 3, number: rooms[rooms.length - 1].number },
          ],
          totalPrice,
        },
      },
      { runValidators: true, new: true }
    )
  );
};

export const deleteHotelServiceAction = (id) => HotelModel.findByIdAndDelete(id);
