import { PlayerTable } from "@/components/player/PlayerTable";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/layouts/Layout";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FoundationOutlinedIcon from "@mui/icons-material/FoundationOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Link from 'next/link'

const HomePage: NextPage = () => {
  return (
    <Layout title="Clan DAK">
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ mb: 10, display: "flex", justifyContent: "center" }}
        >
          <Image src="/dak-logo.png" alt="Logo" width={500} height={500} />
        </Grid>

        <Divider />

        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: 275 }}>
            <CardContent>
              <Typography display="flex" justifyContent="center">
                <FoundationOutlinedIcon sx={{ fontSize: "48px" }} />
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                Fundado en el año 2006
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: 275 }}>
            <CardContent>
              <Typography display="flex" justifyContent="center">
                <EmojiEventsOutlinedIcon
                  sx={{ fontSize: "48px", color: "gold" }}
                />
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                Ganadores de 4 torneos de clanes de JTP
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: 275 }}>
            <CardContent>
              <Typography display="flex" justifyContent="center">
                <StarBorderOutlinedIcon
                  sx={{ fontSize: "48px", color: "gold" }}
                />
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                Top en el Mundo de Clanes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid display='flex' justifyContent='center' sx={{mt: 10}}>
          <Typography variant="h4" width="80%" textAlign='center' >
            Únete al discord del <Link href="https://discord.gg/3kY333VN">Mundo de clanes</Link> para muchos duelos y torneos al estilo del legendario juego Joey the passion
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ mb: 10, display: "flex", justifyContent: "center" }}
        >
          <Image src="/mdc-logo.png" alt="Logo" width={400} height={400} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
