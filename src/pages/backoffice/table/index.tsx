import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewTableDialog from "@/components/NewTableDialog";
import { useAppSelector } from "@/store/hooks";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Table = () => {
  const [open, setOpen] = useState(false);
  const { tables } = useAppSelector((store) => store.table);

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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.1, mt: 2 }}>
        {tables.map((item) => (
          <Box key={item.id}>
            <ItemCard
              title={item.name}
              icon={
                <TableRestaurantIcon
                  sx={{ fontSize: "2.5rem", color: "#31363F" }}
                />
              }
              href={`/backoffice/table/${item.id}`}
              available={true}
            />
          </Box>
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default Table;
