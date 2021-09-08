import { TransportTypeNumberAlreadyExistsError } from './errors';
import { TransportTypeNumberModel } from './schema';

export const getTransportTypeNumberPresenceAction = (
  calculationType,
  personsNumber,
  seasonType,
  comfortLevel
) => TransportTypeNumberModel.findOne({ calculationType, personsNumber, seasonType, comfortLevel });

export const createTransportTypeNumberAction = async (
  calculationType,
  personsNumber,
  seasonType,
  comfortLevel,
  transportTypeCount
) => {
  if (
    await getTransportTypeNumberPresenceAction(
      calculationType,
      personsNumber,
      seasonType,
      comfortLevel
    )
  ) {
    return Promise.reject(new TransportTypeNumberAlreadyExistsError());
  }
  return TransportTypeNumberModel.create({
    calculationType,
    personsNumber,
    seasonType,
    comfortLevel,
    transportTypeCount,
  });
};

export const getAllTransportTypesNumbersAction = () => TransportTypeNumberModel.find();

export const getTransportTypesNumberByIdAction = (id) => TransportTypeNumberModel.findById(id);

export const updateTransportTypeNumberAction = (id, transportTypeNumber) =>
  TransportTypeNumberModel.findByIdAndUpdate(
    id,
    {
      $set: {
        calculationType: transportTypeNumber.calculationType,
        personsNumber: transportTypeNumber.personsNumber,
        seasonType: transportTypeNumber.seasonType,
        comfortLevel: transportTypeNumber.comfortLevel,
        transportTypeCount: transportTypeNumber.transportTypeCount,
      },
    },
    { runValidators: true, new: true }
  );

export const deleteTransportTypeNumberAction = (id) =>
  TransportTypeNumberModel.findByIdAndDelete(id);
