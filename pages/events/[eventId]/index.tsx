import { eventsAPI } from '@/apis';
import { GetServerSideProps, GetStaticProps } from 'next';
import { FC } from 'react';
import { PlayerTable } from '@/components/player/PlayerTable';
import { Layout } from '@/components/layouts/Layout';
import { DuelStatistic } from '@/interfaces';
import { DuelModel, DuelStatisticsModel } from '@/models';
import { db } from '@/database';
import { ClanTable } from '@/components/clan/ClanTable';
import { PieChart } from '@/components/ui/PieChart';
import { Grid } from '@nextui-org/react';

interface Props {
  statistics: DuelStatistic[];
  clanStats: { clan: string; matchCount: number; average: string, missingDuels: number,  maxPointsAvailable: number,  }[];
  vsStats: { _id: string; matchCount: number; matchWins: number; matchLosses: number }[]
}

const EventPage: FC<Props> = ({ statistics, clanStats, vsStats }) => {
  
  return (
    <Layout>
      <PlayerTable
        statistics={statistics.map((statistic) => ({
          ...statistic,
          id: statistic._id,
        }))}
      />
      <PieChart
        data={vsStats.map(({ _id, matchWins }) => ({
          name: _id,
          value: matchWins,
        }))}
        title="Match Ganados"
      />
      <PieChart
        data={vsStats.map(({ _id, matchLosses }) => ({
          name: _id,
          value: matchLosses,
        }))}
        title="Match Perdidos"
      />
      <ClanTable clanStats={clanStats} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async({ params }) => {
  const { eventId } = params as { eventId: string }
  db.connect()
  const response = await DuelStatisticsModel.find({ eventId })
  const statistics = response.map(item => ({ ...item.toObject(), _id: item._id.toString() }))
  const playerClanStats = await DuelModel.aggregate([
    {
      $match: { eventId }
    },
    {
      $group: {
        _id: '$playerClan',
        points: { $sum: '$playerPoints' },
        matchCount: { $sum: 1}
      }
    }
  ]).exec()

  const opponentClanStats = await DuelModel.aggregate([
    {
      $match: { eventId }
    },
    {
      $group: {
        _id: '$opponentClan',
        points: { $sum: '$opponentPoints' },
        matchCount: { $sum: 1}
      }
    }
  ]).exec()

  const playerClanNames = playerClanStats.map(clan => clan._id)
  const opponentClanNames = opponentClanStats.map(clan => clan._id)
  const clanNames = Array.from(new Set([...playerClanNames, ...opponentClanNames]))

  const clanStats = clanNames.map((name, index) => {
    const playerClanStat = playerClanStats.find(playerClan => playerClan._id === name)
    const opponentClanStat = opponentClanStats.find(opponentClan => opponentClan._id === name)
    const points = (playerClanStat?.points || 0) + (opponentClanStat?.points || 0)
    const matchCount = (playerClanStat?.matchCount || 0) + (opponentClanStat?.matchCount || 0)
    const average = (points / matchCount).toFixed(2)
    const missingDuels = 36 - matchCount
    const maxPointsAvailable =  (missingDuels * 6) + points

    return {
      clan: name,
      points,
      matchCount,
      average,
      id: index,
      missingDuels,
      maxPointsAvailable
    }
  })

  const vsStats = await DuelModel.aggregate(  [
    {
      $match: { playerClan: 'DAK' }
    },
    {
      $group: { 
        _id: '$opponentClan', 
        matchCount: { $sum: 1 },
        matchWins: { $sum: { $cond: [ { $eq: [ "$playerWon", true ] }, 1, 0] }},
        matchLosses: { $sum: { $cond: [ { $eq: [ "$playerWon", false ] }, 1, 0] }}
      }
      
    }
  ])

  return {
    props: {
      statistics,
      clanStats: clanStats.sort((b: any , a: any) => a.points - b.points ),
      vsStats
    },
  };
}

export default EventPage