import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const clicks = await redis.lrange('clicks', 0, 99);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(clicks.map(c => typeof c === 'string' ? JSON.parse(c) : c));
}
