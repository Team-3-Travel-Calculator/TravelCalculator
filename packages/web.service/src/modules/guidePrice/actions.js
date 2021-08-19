import { GuidePriceAlreadyExistsError } from './errors';
import { GuidePriceModel } from './schema';

export const getGuidePricePresenceAction = (
  guideType,
  groupSize,
  seasonType,
  comfortLevel,
  workTermType
) => GuidePriceModel.findOne({ guideType, groupSize, seasonType, comfortLevel, workTermType });

export const createGuidePriceAction = async (guideData, price) => {
  if (
    await getGuidePricePresenceAction(
      guideData.guideType,
      guideData.groupSize,
      guideData.seasonType,
      guideData.comfortLevel,
      guideData.workTermType
    )
  ) {
    return Promise.reject(new GuidePriceAlreadyExistsError());
  }
  return GuidePriceModel.create({
    guideType: guideData.guideType,
    groupSize: guideData.groupSize,
    seasonType: guideData.seasonType,
    comfortLevel: guideData.comfortLevel,
    workTermType: guideData.workTermType,
    price,
  });
};

export const getAllGuideTypesPricesAction = () => GuidePriceModel.find();

export const getGuidePriceByIdAction = (id) => GuidePriceModel.findById(id);

export const updateGuidePriceAction = (id, guidePrice) =>
  GuidePriceModel.findByIdAndUpdate(
    id,
    {
      $set: {
        guideType: guidePrice.guideType,
        groupSize: guidePrice.groupSize,
        seasonType: guidePrice.seasonType,
        comfortLevel: guidePrice.comfortLevel,
        workTermType: guidePrice.workTermType,
        price: guidePrice.price,
      },
    },
    { runValidators: true, new: true }
  );

export const deleteGuidePriceAction = (id) => GuidePriceModel.findByIdAndDelete(id);
