import { EventCard } from "@/components/events/EventCard";
import { Layout } from "@/components/layouts/Layout"
import { Grid } from "@mui/material";

const EventsPage = () => {
  const events = [{
    "name": "Torneo de clanes",
    "cover": "https://i.pinimg.com/originals/0e/72/b3/0e72b35e99486084d2170a8d7cc38394.png",
    "uuid": "98c2c2a0-c2d0-11ed-afa1-0242ac120002",
    "season": 4
  }]

  return (
    <Layout title="Eventos">
      <Grid container display='flex' sx={{ mt: 5 }}>
        {events.map((event) => (
          <Grid item key={event.uuid}>
            <EventCard   event={event}/>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default EventsPage