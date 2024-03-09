import BackofficeLayout from "@/components/BackofficeLayout";
import NewLocationDialog from "@/components/NewLocationDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState(false);

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
          }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          new Location
        </Button>
      </Box>
      <NewLocationDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Location;
