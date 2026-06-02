export default async function handler(req, res) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    const click = JSON.stringify({
      timestamp: new Date().toISOString(),
      country: req.headers['x-vercel-ip-country'] || 'Unknown',
      city: req.headers['x-vercel-ip-city'] || 'Unknown',
      referrer: req.headers['referer'] || 'Direct'
    });

    await fetch(`${url}/lpush/clicks/${encodeURIComponent(click)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch(e) {
    console.error(e);
  }

  res.setHeader('Location', 'https://www.turbodebt.com');
  res.status(302).end();
}
