import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewAddonCategoryDialog from "@/components/NewAddonCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
  const [open, setOpen] = useState(false);
  const { addonCategories } = useAppSelector((store) => store.addonCategory);

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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.1, mt: 2 }}>
        {addonCategories.map((item) => (
          <Box key={item.id}>
            <ItemCard
              title={item.name}
              icon={
                <LibraryBooksIcon
                  sx={{ fontSize: "2.5rem", color: "#31363F" }}
                />
              }
              href={`/backoffice/addon-category/${item.id}`}
              available
            />
          </Box>
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default AddonCategory;
