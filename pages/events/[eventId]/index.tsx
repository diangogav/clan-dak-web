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
import axios from 'axios';

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

  const clanStatsresponse = await axios.get(`https://dak-backend-production.up.railway.app/v1/duels/event/${eventId}/clan/stats`)
  const clanStats = clanStatsresponse?.data
  
  const vsStatsresponse = await axios.get(`https://dak-backend-production.up.railway.app/v1/duels/event/${eventId}/clan/DAK/stats/against-opposing-clans`)
  const vsStats = vsStatsresponse?.data

  return {
    props: {
      statistics,
      clanStats: clanStats.map((item: any, index: number) => ({...item, id: index})).sort((b: any , a: any) => a.points - b.points ),
      vsStats
    },
  };
}

export default EventPage