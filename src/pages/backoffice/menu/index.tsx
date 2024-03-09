import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuDialog from "@/components/NewMenuDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menu = () => {
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
          new Menu
        </Button>
      </Box>
      <NewMenuDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Menu;
