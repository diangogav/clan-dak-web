import { db } from '@/database'
import { PlayerModel, DuelModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  await db.connect()
  const playerId = req?.query?.playerId as string
  const response = await calculatePlayerStats(playerId)
  if(!response) { return res.status(200) }
  await PlayerModel.updateOne({ _id: playerId }, { $set: response })
  res.status(200).json(response)
}

export async function calculatePlayerStats(playerId: string) {
  const response = await DuelModel.aggregate([
    {
      $match: {
        playerId
      }
    },
    {
      $group: {
        
        _id: null,
        wins: { $sum: "$wins" },
        defeats: { $sum: "$defeats" },
        matchWins: { $sum: { $cond: [ { $eq: [ "$playerWon", true ] }, 1, 0] }},
        matchLosses: { $sum: { $cond: [ { $eq: [ "$playerWon", false ] }, 1, 0] }},
        matchesPlayed: { $sum: 1 },
        points: { $sum: "$playerPoints" }
      }
    }
  ]).exec()

  if(response.length === 0) { return null }

  const {_id, ...stats } = response[0]

  return stats
}