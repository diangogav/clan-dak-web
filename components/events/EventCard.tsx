import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
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
      <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
        <CardActionArea>
          <CardMedia component="img" image={event.cover} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Temporada ${event.season}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}