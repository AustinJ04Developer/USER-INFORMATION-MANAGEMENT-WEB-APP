import 'reflect-metadata';
import dotenv from 'dotenv';
// Load environment variables from .env or Config.env
dotenv.config({ path: './.env' });
if (!process.env.PORT) {
  dotenv.config({ path: './Config.env' });
}
import app from './index';

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Backend API is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
