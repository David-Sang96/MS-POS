import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);
  const { selectedLocation } = useAppSelector((store) => store.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (store) => store.disableLocationMenuCategory
  );

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
      <Box sx={{ display: "flex", gap: 1.1, flexWrap: "wrap", mt: 2 }}>
        {menuCategories.map((menuCategory) => {
          const isAvailable = disableLocationMenuCategories.find(
            (item) =>
              item.menuCategoryId === menuCategory.id &&
              item.locationId === selectedLocation?.id
          )
            ? false
            : true;
          return (
            <Box key={menuCategory.id}>
              <ItemCard
                icon={
                  <MenuBookIcon sx={{ fontSize: "3rem", color: "#31363F" }} />
                }
                title={menuCategory.name}
                subTitle="test category"
                href={`/backoffice/menu-category/${menuCategory.id}`}
                available={isAvailable}
              />
            </Box>
          );
        })}
      </Box>
      <NewMenuCategoryDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default MenuCategory;
