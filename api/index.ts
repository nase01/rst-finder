import express, { Request, Response } from 'express';
import axios from 'axios';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer, IncomingMessage, ServerResponse } from 'http';

const app = express();
app.use(express.json());

// routes
app.get('/api/ping', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.github.com');
    res.json({ message: 'pong', github: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from GitHub' });
  }
});

// localhost
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
}

// vercel
const server = createServer(app);
export default function handler(req: VercelRequest, res: VercelResponse) {
  return server.emit('request', req as unknown as IncomingMessage, res as unknown as ServerResponse);
}
