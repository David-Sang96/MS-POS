import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewAddonDialog from "@/components/NewAddonDialog";
import { useAppSelector } from "@/store/hooks";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState(false);
  const { addons } = useAppSelector((store) => store.addon);

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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.1, mt: 2 }}>
        {addons.map((item) => (
          <Box key={item.id}>
            <ItemCard
              title={item.name}
              icon={
                <ImportContactsIcon
                  sx={{ fontSize: "2.5rem", color: "#31363F" }}
                />
              }
              href={`/backoffice/addon/${item.id}`}
              available={true}
            />
          </Box>
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default Addon;
