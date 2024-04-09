import { useAppSelector } from "@/store/hooks";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data } = useSession();
  const { selectedLocation } = useAppSelector((store) => store.app);

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#76ABAE", color: "#222831", height: "7%" }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Foodie POS
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          {selectedLocation?.name}
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
