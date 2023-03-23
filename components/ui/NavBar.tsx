import { AppBar, Toolbar, Typography } from "@mui/material"

export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Clan DAK</Typography>
      </Toolbar>
    </AppBar>
  );
}