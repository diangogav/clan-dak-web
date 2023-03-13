import { Layout } from '../../components/layouts/Layout';
import { useState, useEffect } from 'react';
import { playersAPI } from '@/apis';
import { Player } from '@/interfaces';
import { Card, Grid, Row, Text } from '@nextui-org/react';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const getPlayers = async () => {
    const { data } = await playersAPI.get<Player[]>('/players')
    setPlayers(data.map( player => {
      return {
        ...player,
        winRate: (player.matchWins / player.matchesPlayed) || 1
      }
    }))
  } 

  useEffect(() => {
    getPlayers()
  }, [])
  
  return (
    <Layout>
      <Grid.Container gap={2} justify="flex-start">
        {players.map((player) => (
          <Grid key={player._id} xs={6} sm={3} md={2}>
            <Card isHoverable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image src="https://images4.fanpop.com/image/photos/20100000/Yusei-Fudo-yusei-fudo-20162073-853-480.jpg" width="100%" height={140} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{player.nickname}</Text>
                  <Text>{player.winRate}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
}

export default Players