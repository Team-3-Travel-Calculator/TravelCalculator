import { model, Schema } from 'mongoose';

export type Transport = {
  readonly title: string;
  readonly description?: string;
};

export const schema = new Schema<Transport>({
  title: { type: String, required: true },
  description: { type: String },
});

export const TransportModel = model<Transport>('Transport', schema);
