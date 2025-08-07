// api/hashioProxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const HASHIO_URL = 'https://testnet.hashio.io/api';
  
  try {
    const hashioRes = await fetch(HASHIO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await hashioRes.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch from Hashio', details: error.message });
  }
};

export default handler;
