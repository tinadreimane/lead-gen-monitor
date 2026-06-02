import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const click = {
      timestamp: new Date().toISOString(),
      country: req.headers['x-vercel-ip-country'] || 'Unknown',
      city: req.headers['x-vercel-ip-city'] || 'Unknown',
      referrer: req.headers['referer'] || 'Direct'
    };

    await redis.lpush('clicks', JSON.stringify(click));
  } catch(e) {
    console.error('Track error:', e);
  }

  res.setHeader('Location', 'https://www.turbodebt.com');
  res.status(302).end();
}
