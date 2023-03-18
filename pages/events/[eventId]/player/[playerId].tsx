import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { db } from '@/database';
import { DuelModel, PlayerModel } from '@/models';
import { Duel, Player } from '../../../../interfaces';
import { Card, Grid, Image, Text } from '@nextui-org/react';

interface Props {
  player: Player
  duels: Duel[]
}

const EventPage: FC<Props> = ({ player, duels }) => {
  return (
    <Layout>
      <Grid.Container
        gap={2}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {duels.map((duel) => (
          <Grid key={duel._id}>
            <Card>
              <Card.Body>
                <Text>
                  {" "}
                  {player.nickname} {duel.wins} vs {duel.defeats}{" "}
                  {duel.opponent}{" "}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async({ params }) => {
  const { playerId, eventId } = params as { playerId: string; eventId: string }
  db.connect()
  const response = await DuelModel.find({ playerId, eventId })
  const duels = response.map(item => ({...item.toObject(), _id: item._id.toString() }) )
  const player = await PlayerModel.findOne({ _id: playerId })
  if(!player) { throw new Error('Player not found') }
  return {
    props: {
      duels,
      player: {
        ...player.toObject(),
        _id: player._id.toString()
      }
    },
  };
}

export default EventPage