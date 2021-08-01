import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection } from 'mongoose';

let mongodb: MongoMemoryServer;

const defaultOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const rootMongooseTestModule = (
  options: MongooseModuleOptions = defaultOptions,
) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongodb = await MongoMemoryServer.create();
      const mongoUri = mongodb.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeDatabase = async () => {
  await connection.close();
  await mongodb.stop();
};

export const clearDatabase = async () => {
  const collections = connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
