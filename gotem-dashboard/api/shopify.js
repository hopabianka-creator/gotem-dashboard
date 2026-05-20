// api/shopify.js — Vercel serverless function
// Proxy między frontendem a Shopify Admin API
// Vercel wstrzykuje zmienne środowiskowe, token nigdy nie trafia do przeglądarki

export default async function handler(req, res) {
  // CORS — zezwól tylko na zapytania z Twojej domeny
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { endpoint, limit = 250, status = 'any', order = 'created_at desc' } = req.query;

  const SHOP = process.env.SHOPIFY_SHOP;       // gotem.myshopify.com
  const TOKEN = process.env.SHOPIFY_TOKEN;     // shpat_xxx

  if (!SHOP || !TOKEN) {
    return res.status(500).json({ error: 'Brak zmiennych środowiskowych SHOPIFY_SHOP i SHOPIFY_TOKEN' });
  }

  const allowed = ['products', 'orders', 'customers', 'inventory_levels'];
  if (!allowed.includes(endpoint)) {
    return res.status(400).json({ error: `Niedozwolony endpoint: ${endpoint}` });
  }

  let url = `https://${SHOP}/admin/api/2024-01/${endpoint}.json?limit=${limit}`;
  if (endpoint === 'orders') url += `&status=${status}&order=${encodeURIComponent(order)}`;

  try {
    const shopifyRes = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (!shopifyRes.ok) {
      const err = await shopifyRes.text();
      return res.status(shopifyRes.status).json({ error: `Shopify error: ${err}` });
    }

    const data = await shopifyRes.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: `Fetch error: ${e.message}` });
  }
}
