import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DuelStatisticsModel } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  await db.connect()
  const eventId = req?.query?.eventId as string
  const response = await DuelStatisticsModel.find({ eventId })
  res.status(200).json(response)
}
