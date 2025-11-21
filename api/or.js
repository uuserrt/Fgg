// api/or.js
export default async function handler(req, res) {
  try {
    const OR_KEY = process.env.OR_KEY;
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OR_KEY}` },
      body: JSON.stringify(req.body)
    });
    const text = await r.text();
    res.status(r.status).setHeader('content-type','application/json').send(text);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
}
