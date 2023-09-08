import type { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
  });

  const channel = 'chat';

  try {
    await pusher.trigger(channel, 'message', { message });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
}
