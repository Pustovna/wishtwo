import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu";
import PublicMenu from "./components/PublicMenu";
import { auth } from "@/auth";

export default async function HeaderWidget() {
  const session = await auth();
  const user = session?.user;

  return (
    <AppBar position="static" color={"transparent"}>
      <Container maxWidth="xl">
        <Toolbar>
          <Logo />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {session ? (
              <UserMenu user={user} />
            ) : (
              <PublicMenu />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
