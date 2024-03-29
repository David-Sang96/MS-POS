import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data } = useSession();
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#76ABAE", color: "#222831", height: "7%" }}
    >
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Foodie POS
        </Typography>
        {data && (
          <Button
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
            }}
            variant="contained"
            onClick={() => signOut()}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
