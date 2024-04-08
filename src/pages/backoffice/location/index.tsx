import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewLocationDialog from "@/components/NewLocationDialog";
import { useAppSelector } from "@/store/hooks";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState(false);
  const { locations } = useAppSelector((store) => store.location);

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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.1, mt: 2 }}>
        {locations.map((item) => (
          <Box key={item.id}>
            <ItemCard
              title={item.name}
              icon={
                <PinDropIcon sx={{ fontSize: "2.5rem", color: "#31363F" }} />
              }
              href={`/backoffice/location/${item.id}`}
              available={true}
            />
          </Box>
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default Location;
