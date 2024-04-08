import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { menus } = useAppSelector((store) => store.menu);
  const { selectedLocation } = useAppSelector((store) => store.app);
  const { disableLocationMenus } = useAppSelector(
    (store) => store.disableLocationMenu
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
          new Menu
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1.1, flexWrap: "wrap", mt: 2 }}>
        {menus.map((menu) => {
          const isAvailable = disableLocationMenus.find(
            (item) =>
              item.menuId === menu.id &&
              item.locationId === selectedLocation?.id
          )
            ? false
            : true;
          return (
            <Box key={menu.id}>
              <ItemCard
                icon={
                  <AutoAwesomeMosaicIcon
                    sx={{ fontSize: "2.5rem", color: "#31363F" }}
                  />
                }
                title={menu.name}
                price={menu.price}
                description={menu.description as string}
                href={`/backoffice/menu/${menu.id}`}
                available={isAvailable}
              />
            </Box>
          );
        })}
      </Box>
      <NewMenuDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Menu;
