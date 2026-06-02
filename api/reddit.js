export default async function handler(req, res) {
  const subreddit = req.query.subreddit || 'personalfinance';
  
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/new.json?limit=50`,
      { 
        headers: { 
          'User-Agent': 'bot:lead-gen-monitor:1.0 (by /u/reel_and_wrench)',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9'
        } 
      }
    );
    
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(response.status).send(text);
    
  } catch(e) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: e.message });
  }
}
