import { model, Schema } from 'mongoose';

export type GroupSize = {
  readonly groupName: string;
  readonly personsLimit: number;
};

export const schema = new Schema<GroupSize>({
  title: { type: String, required: true },
  personsLimit: { type: Number, required: true },
});

export const GroupSizeModel = model<GroupSize>('GroupSize', schema);
