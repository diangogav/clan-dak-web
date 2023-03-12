import { PlayerTable } from "@/components/player/PlayerTable";
import { NextPage } from "next";
import { Layout } from '../components/layouts/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <PlayerTable />
    </Layout>
  )
}

export default HomePage;
