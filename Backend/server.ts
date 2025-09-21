import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config({ path: './Config.env' }); 
import app from './index';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
