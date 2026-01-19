import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));
