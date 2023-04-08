import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material"
import NextLink from 'next/link'
export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link> Clan DAK </Link>
        </NextLink>

        <Box flex={1} />

        <Box>
          <NextLink href="/events" passHref legacyBehavior>
            <Link>
              <Button>Eventos</Button>
            </Link>
          </NextLink>
        </Box>

      </Toolbar>
    </AppBar>
  );
}