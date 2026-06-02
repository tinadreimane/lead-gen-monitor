const clicks = [];

export default function handler(req, res) {
  const timestamp = new Date().toISOString();
  const country = req.headers['x-vercel-ip-country'] || 'Unknown';
  const city = req.headers['x-vercel-ip-city'] || '';
  const referrer = req.headers['referer'] || 'Direct';

  clicks.unshift({ timestamp, country, city, referrer });

  // Redirect to TurboDebt
  res.setHeader('Location', 'https://www.turbodebt.com');
  res.status(302).end();
}
