import axios from 'axios';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || 'https://api.github.com';

app.use(express.json());

app.get('/ping', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(API_URL);
    res.json({ message: 'pong', data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
