import exactMath from 'exact-math';

import { GuidePriceModel } from '../guidePrice';
import { GuideGroupSizes, GuideTypes, WorkTermTypes } from '../guideTypes';
import { GuideModel } from './schema';

export const getWorkTermTypeAction = (guidesData) => {
  if (
    guidesData.type === GuideTypes.Tour &&
    parseFloat(guidesData.workHours) <= WorkTermTypes.ShortTerm.hourLimit
  ) {
    return WorkTermTypes.ShortTerm.code;
  } else if (
    guidesData.type === GuideTypes.Tour &&
    parseFloat(guidesData.workHours) > WorkTermTypes.ShortTerm.hourLimit &&
    parseFloat(guidesData.workHours) <= WorkTermTypes.MidTerm.hourLimit
  ) {
    return WorkTermTypes.MidTerm.code;
  } else if (
    guidesData.type === GuideTypes.Tour &&
    parseFloat(guidesData.workHours) > WorkTermTypes.MidTerm.hourLimit
  ) {
    return WorkTermTypes.LongTerm.code;
  }
  return WorkTermTypes.NoTerm.code;
};

export const getGroupSizeAction = (persons) => {
  if (persons.personsNumber && persons.personsNumber <= GuideGroupSizes.Small.personsLimit) {
    return GuideGroupSizes.Small.code;
  } else if (
    persons.personsNumber &&
    persons.personsNumber > GuideGroupSizes.Small.personsLimit &&
    persons.personsNumber <= GuideGroupSizes.Medium.personsLimit
  ) {
    return GuideGroupSizes.Medium.code;
  }
  return GuideGroupSizes.Large.code;
};

export const getGuideTotalPrice = async (seasonType, comfortLevel, guidesList) => {
  const guideTypesTotalPrices = await Promise.all(
    guidesList.map(async ({ type, number, workHours, personsNumber }) => {
      const workTerm = getWorkTermTypeAction({ type, workHours });
      const groupSize = getGroupSizeAction({ personsNumber });
      const guideTypePrice = await GuidePriceModel.findOne({
        workTermType: workTerm,
        groupSize,
        seasonType,
        comfortLevel,
        guideType: type,
      });
      return exactMath.mul(guideTypePrice.price, number);
    })
  );
  return guideTypesTotalPrices.reduce((sum, value) => sum + value).toFixed(0);
};

export const createGuideServiceAction = (client, workDate, seasonType, comfortLevel, guidesList) =>
  getGuideTotalPrice(seasonType, comfortLevel, guidesList).then((total) =>
    GuideModel.create({
      client,
      workDate,
      seasonType,
      comfortLevel,
      guidesList,
      totalPrice: total,
    })
  );

export const getAllGuideServicesAction = () => GuideModel.find().populate({ path: 'client' });

export const getGuideServiceByIdAction = (id) =>
  GuideModel.findById(id).populate({ path: 'client' });

export const updateGuideServiceAction = (id, client, workDate, guideParameters, guidesList) =>
  getGuideTotalPrice(guideParameters.seasonType, guideParameters.comfortLevel, guidesList).then(
    (total) =>
      GuideModel.findByIdAndUpdate(
        id,
        {
          $set: {
            client,
            workDate,
            seasonType: guideParameters.seasonType,
            comfortLevel: guideParameters.comfortLevel,
            guidesList,
            totalPrice: total,
          },
        },
        { runValidators: true, new: true }
      )
  );

export const deleteGuideServiceAction = (id) => GuideModel.findByIdAndDelete(id);
