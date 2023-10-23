import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RouteIcon from "@mui/icons-material/Route";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BottomNav = () => {
  const router = useRouter();
  const [value, setValue] = useState("/");

  useEffect(() => {
    setValue(router.pathname);
  }, [router.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: "secondary.main" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(newValue);
        }}
      >
        <BottomNavigationAction label="Domů" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Mapy"
          value="/maps"
          icon={<RouteIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
