import BackofficeLayout from "@/components/BackofficeLayout";
import NewAddonCategoryDialog from "@/components/NewAddonCategoryDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
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
          new AddonCategory
        </Button>
      </Box>
      <NewAddonCategoryDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default AddonCategory;
