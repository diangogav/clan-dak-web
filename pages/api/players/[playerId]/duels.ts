import { db } from '@/database'
import { DuelModel, PlayerModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { calculatePlayerStats } from '.';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  switch(req.method) {
    case 'GET': {
      await db.connect()
      const playerId = req?.query?.playerId as string
      const duels = await DuelModel.find({ playerId })
      res.status(200).json(duels)
      break
    }

    case 'POST': {
      const playerId = req?.query?.playerId as string
      await db.connect()
      const duel = new DuelModel({ ...req?.body, playerId })
      await duel.save()
      const stats = await calculatePlayerStats(playerId)
      await PlayerModel.updateOne({ _id: playerId }, { $set: stats })
      res.status(200).json(duel)
      break
    }
  }
  
}