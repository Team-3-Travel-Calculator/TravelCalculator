import { connect } from 'mongoose';

export const databaseConnect = () =>
  connect(process.env.DB_URL ?? '', {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
