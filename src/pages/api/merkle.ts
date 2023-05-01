import type { NextApiRequest, NextApiResponse } from 'next';
import { getMerkleProof } from '../../util/merkle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query as { address: string };

  if (!address) {
    res.status(400).json({ error: 'Address is required' });
    return;
  }

  try {
    const merkleProof = getMerkleProof(address);
    res.status(200).json({ merkleProof });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Merkle proof' });
  }
}
