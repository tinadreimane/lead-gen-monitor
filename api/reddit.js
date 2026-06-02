export default async function handler(req, res) {
  const subreddit = req.query.subreddit || 'personalfinance';
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/new.json?limit=50`,
    { headers: { 'User-Agent': 'lead-gen-monitor/1.0' } }
  );
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
