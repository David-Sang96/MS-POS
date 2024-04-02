import BackofficeLayout from "@/components/BackofficeLayout";
import MenuCard from "@/components/MenuCard";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { menus } = useAppSelector((store) => store.menu);

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
        {menus.map((item) => (
          <Box key={item.id}>
            <MenuCard
              icon={
                <AutoAwesomeMosaicIcon
                  sx={{ fontSize: "2.5rem", color: "#31363F" }}
                />
              }
              title={item.name}
              price={item.price}
              description={item.description as string}
              href={`/backoffice/menu/${item.id}`}
            />
          </Box>
        ))}
      </Box>
      <NewMenuDialog open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Menu;
