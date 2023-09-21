import createClient from '@sanity/client';
import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

const config = {
  projectId: 'l4h1g3vt',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-02-17',
  token: process.env.SANITY_SECRET_TOKEN,
};
export const Client = createClient(config);
