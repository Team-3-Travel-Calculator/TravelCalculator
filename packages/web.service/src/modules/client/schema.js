import { model, Schema } from 'mongoose';

import { Countries } from '../country';
import { Languages } from '../language';

export const ClientTypes = {
  Company: 1,
  Individual: 2,
};

const ClientSchema = new Schema(
  {
    country: {
      type: String,
      enum: Object.values(Countries).map((country) => country.code),
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, enum: Object.values(Languages), required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
const ClientModel = model('Client', ClientSchema);

const ClientIndividualSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true },
  },
  {
    discriminatorKey: 'type',
  }
);

export const ClientIndividualModel = ClientModel.discriminator(
  ClientTypes.Individual,
  ClientIndividualSchema
);

const ClientCompanySchema = new Schema(
  {
    companyName: { type: String, required: true, unique: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const ClientCompanyModel = ClientModel.discriminator(
  ClientTypes.Company,
  ClientCompanySchema
);
