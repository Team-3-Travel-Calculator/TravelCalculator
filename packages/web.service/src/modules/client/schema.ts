import { model, Schema } from 'mongoose';

import type { CountryCode } from '../country';
import type { LanguageCode } from '../language';

export enum ClientTypes {
  Company = 1,
  Individual = 2,
}
export type ClientBase = {
  readonly country: CountryCode;
  readonly email: string;
  readonly phone: string;
  readonly language: LanguageCode;
};

export type ClientCompany = ClientBase & {
  readonly type: ClientTypes.Company;
  readonly name: string;
};

export type ClientIndividual = ClientBase & {
  readonly type: ClientTypes.Individual;
  readonly fullName: string;
};

export type Client = ClientCompany | ClientIndividual;

const client = new Schema(
  {
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
const ClientModel = model('Client', client);

const clientIndividual = new Schema(
  {
    fullName: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);

export const ClientIndividualModel = ClientModel.discriminator(
  ClientTypes.Individual,
  clientIndividual
);

const clientCompany = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const ClientCompanyModel = ClientModel.discriminator(ClientTypes.Company, clientCompany);
