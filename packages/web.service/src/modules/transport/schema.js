import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';

const TransportSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    transportationDate: { type: Date, required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
    personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
    transportTypeCount: {
      type: { type: Number, enum: Object.values(TransportTypes), required: true },
      number: { type: Number, required: true },
    },
    calculationType: {
      type: Number,
      enum: Object.values(TransportCalculationTypes),
      required: true,
    },
    totalPrice: { type: String, required: true },
  },
  {
    discriminatorKey: 'calculationType',
  }
);
const TransportModel = model('Transport', TransportSchema);

const HourlyTransportSchema = new Schema(
  {
    workHours: { type: String, required: true },
  },
  {
    discriminatorKey: 'calculationType',
  }
);

export const HourlyTransportModel = TransportModel.discriminator(
  TransportCalculationTypes.HourlyTransport,
  HourlyTransportSchema
);
