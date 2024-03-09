import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);

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
          new MenuCategory
        </Button>
      </Box>
      <NewMenuCategoryDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default MenuCategory;
