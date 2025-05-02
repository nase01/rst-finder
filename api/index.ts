import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Request, Response } from 'express';
import axios from 'axios';
import { createServer, IncomingMessage, ServerResponse } from 'http';

const app = express();

app.use(express.json());

app.get('/ping', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.github.com');
    res.json({ message: 'pong', github: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from GitHub' });
  }
});

// Export handler for Vercel
const server = createServer(app);

export default function handler(req: VercelRequest, res: VercelResponse) {
  return server.emit('request', req as unknown as IncomingMessage, res as unknown as ServerResponse);
}