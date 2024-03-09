import BackofficeLayout from "@/components/BackofficeLayout";
import NewTableDialog from "@/components/NewTableDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Table = () => {
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
          new Table
        </Button>
      </Box>
      <NewTableDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Table;
