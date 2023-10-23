import config from "@/config";
import { Avatar, Button, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signIn, signOut, useSession } from "next-auth/react";

const CustomAppBar = () => {
  const { data: session, status } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ maxWidth: "md", margin: "auto", width: "100%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Renault Twitch Cup Trackmania
          </Typography>
          {config.enableAuth && (
            <>
              {" "}
              {status === "authenticated" ? (
                <Box
                  sx={{ display: "flex", columnGap: 2, alignItems: "center" }}
                >
                  <Chip
                    avatar={
                      <Avatar>
                        {session?.user?.name
                          ? session?.user?.name.charAt(0)
                          : "U"}
                      </Avatar>
                    }
                    label={session?.user?.name}
                  />
                  <Button onClick={() => signOut()} variant="outlined">
                    Odhlásit se
                  </Button>
                </Box>
              ) : (
                <Button onClick={() => signIn("trackmania")} variant="outlined">
                  Přihlásit se
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
