export default async function handler(req, res) {
  const subreddit = req.query.subreddit || 'personalfinance';
  
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/new.json?limit=50&raw_json=1`,
      { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (compatible; LeadGenBot/1.0)',
          'Accept': 'application/json'
        } 
      }
    );
    
    if (!response.ok) {
      throw new Error(`Reddit returned ${response.status}`);
    }
    
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(200).json(data);
    
  } catch(e) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: e.message });
  }
}
