import { LocationAlreadyExistsError } from './errors';
import { LocationModel } from './schema';

export const getLocationPresenceAction = (location) => LocationModel.findOne({ location });

export const addPhotoAction = (req) => ({
  ...req.body,
  photo: req.files ? req.files.map((file) => file.filename) : [],
});

export const createLocationAction = async (req) => {
  if (await getLocationPresenceAction(req.body.location)) {
    return Promise.reject(new LocationAlreadyExistsError());
  }
  const locationData = addPhotoAction(req);
  return LocationModel.create(locationData);
};

export const getAllLocationsAction = () => LocationModel.find();

export const getLocationByIdAction = (id) => LocationModel.findById(id);

export const updateLocationAction = (id, req) => {
  const locationData = addPhotoAction(req);
  return LocationModel.findByIdAndUpdate(
    id,
    {
      $set: {
        location: locationData.location,
        region: locationData.region,
        hoursToVisit: locationData.hoursToVisit,
        photo: locationData.photo,
      },
    },
    { runValidators: true, new: true }
  );
};

export const deleteLocationAction = (id) => LocationModel.findByIdAndDelete(id);
