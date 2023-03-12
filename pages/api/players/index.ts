import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Player } from '../../../interfaces';
import { PlayerModel } from '../../../models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[]>
) {
  await db.connect()
  const players = await PlayerModel.find().lean()
  res.status(200).json(players)
}
