export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      geminiStatus: process.env.GEMINI_API_KEY ? 'Configured' : 'Not Configured'
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
