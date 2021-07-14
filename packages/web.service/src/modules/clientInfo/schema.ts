import { model, Schema } from 'mongoose';

import type { Countries } from '../countries';
import type { Languages } from '../languages';

export enum Types {
  Company = 1,
  Individual = 2,
}

export type Base = {
  readonly country: Countries;
  readonly email: string;
  readonly phone: string;
  readonly language: Languages;
};

export type Company = {
  readonly clientType: Types.Company;
  readonly companyName: string;
};

export type Individual = {
  readonly clientType: Types.Individual;
  readonly fullName: string;
};

export type ClientInfo = Individual | (Base & Company);

export const schema = new Schema<ClientInfo>({
  clientType: { type: Number, required: true },
  fullName: { type: String, nullable: true, default: null },
  companyName: { type: String, nullable: true, default: null },
  country: { type: Schema.Types.ObjectId, ref: 'Countries', required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  language: { type: Schema.Types.ObjectId, ref: 'Languages', required: true },
});

export const ClientInfoModel = model<ClientInfo>('ClientInfo', schema);
