export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  const response = await fetch(`${url}/lrange/clicks/0/99`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data.result || []);
}
