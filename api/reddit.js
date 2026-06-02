export default async function handler(req, res) {
  const subreddit = req.query.subreddit || 'personalfinance';
  
  try {
    // Get OAuth token using reel_and_wrench credentials
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;
    const username = process.env.REDDIT_USERNAME;
    const password = process.env.REDDIT_PASSWORD;

    const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'lead-gen-monitor/1.0 by /u/reel_and_wrench'
      },
      body: `grant_type=password&username=${username}&password=${password}`
    });

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    const response = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/new?limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'lead-gen-monitor/1.0 by /u/reel_and_wrench'
        }
      }
    );

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch(e) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: e.message });
  }
}
