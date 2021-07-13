import { model, Schema } from 'mongoose';

enum ClientTypes {
  Company = 0,
  Individual = 1,
}

type ClientInfo = {
  readonly clientType: ClientTypes;
  readonly companyName: string;
  readonly country: string;
  readonly contactPerson: string;
  readonly email: string;
  readonly phone: string;
  readonly language: string;
};

const schema = new Schema<ClientInfo>({
  clientType: { type: String, required: true },
  companyName: String,
  country: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  language: { type: String, required: true },
});

export const ClientInfoModel = model<ClientInfo>('ClientInfo', schema);
