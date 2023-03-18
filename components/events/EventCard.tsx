import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Event } from '../../interfaces'

interface Props {
  event: Event
}

export const EventCard: FC<Props> = ({ event }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/events/[eventId]", `/events/${event.uuid}`)  
  }

  return (
    <Grid key={event.uuid}>
      <Card isHoverable onClickCapture={handleClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={event.cover} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{event.name}</Text>
            <Text>{`Temporada ${event.season}`}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}