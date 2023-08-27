import mongoose from 'mongoose';

export default async function () {
  const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.nlptsgb.mongodb.net/${process.env.MONGO_DATABASE}`;

  let client: typeof mongoose;

  try {
    client = await mongoose.connect(mongoUri);
    console.log('DB Connected');
  } catch (error) {
    console.log('Error conntecting database: ', error);
  }
}
