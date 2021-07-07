import mongoose from 'mongoose';

export default async function mongoConnection(): Promise<void> {
  await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
