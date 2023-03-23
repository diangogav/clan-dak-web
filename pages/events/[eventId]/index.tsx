import { GetServerSideProps, GetStaticProps } from 'next';
import { FC } from 'react';
import { PlayerTable } from '@/components/player/PlayerTable';
import { Layout } from '@/components/layouts/Layout';
import { DuelStatistic } from '@/interfaces';
import { ClanTable } from '@/components/clan/ClanTable';
import { PieChart } from '@/components/ui/PieChart';
import axios from 'axios';
import { Card, Grid, Typography } from '@mui/material';

interface Props {
  statistics: DuelStatistic[];
  clanStats: { points: number; clan: string; matchCount: number; average: string, missingDuels: number,  maxPointsAvailable: number,  }[];
  vsStats: { _id: string; matchCount: number; matchWins: number; matchLosses: number }[]
}

const EventPage: FC<Props> = ({ statistics, clanStats, vsStats }) => {
  
  return (
    <Layout>
      <Grid container>
        <Grid
          item={true}
          padding={5}
          xs={12}
          md={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <PlayerTable statistics={statistics} />
        </Grid>
        <Grid
          item={true}
          padding={5}
          xs={12}
          md={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ClanTable clanStats={clanStats} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid md={6} padding={5} item={true}>
          <Card>
            <PieChart
              data={vsStats.map(({ _id, matchWins }) => ({
                name: _id,
                value: matchWins,
              }))}
              title="Match Ganados"
            />
          </Card>
        </Grid>
        <Grid md={6} padding={5} item={true}>
          <Card>
            <PieChart
              data={vsStats.map(({ _id, matchLosses }) => ({
                name: _id,
                value: matchLosses,
              }))}
              title="Match Perdidos"
            />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async({ params }) => {
  const { eventId } = params as { eventId: string }
  const statisticsResponse = await axios.get(
    `https://dak-backend-production.up.railway.app/v1/duels/players/stats/event/${eventId}`
  );
  const statistics = statisticsResponse?.data
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