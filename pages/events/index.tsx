import { EventCard } from "@/components/events/EventCard";
import { Layout } from "@/components/layouts/Layout"
import { Grid } from "@nextui-org/react"

const EventsPage = () => {
  const events = [{
    "name": "Torneo de clanes",
    "cover": "https://i.pinimg.com/originals/0e/72/b3/0e72b35e99486084d2170a8d7cc38394.png",
    "uuid": "98c2c2a0-c2d0-11ed-afa1-0242ac120002",
    "season": 4
  }]

  return (
    <Layout title="Eventos">
      <Grid.Container gap={2} justify="flex-start">
        {events.map((event) => (
          <EventCard  key={event.uuid} event={event}/>
        ))}
      </Grid.Container>
    </Layout>
  );
}

export default EventsPage