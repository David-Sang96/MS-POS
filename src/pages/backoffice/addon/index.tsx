import BackofficeLayout from "@/components/BackofficeLayout";
import NewAddonDialog from "@/components/NewAddonDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Addon = () => {
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
          new Addon
        </Button>
      </Box>
      <NewAddonDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Addon;
