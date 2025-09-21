import { AppDataSource } from './data-source';

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection successful!');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
}