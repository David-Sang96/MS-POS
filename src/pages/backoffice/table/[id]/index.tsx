import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTablePayload } from "@/types/table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetails = () => {
  const [open, setOpen] = useState(false);

  const [updatedTable, setUpdatedTable] = useState<UpdateTablePayload>();
  const router = useRouter();
  const id = Number(router.query.id);
  const { tables } = useAppSelector((store) => store.table);
  const table = tables.find((item) => item.id === id);
  const { selectedLocation } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (table) {
      setUpdatedTable(table);
    }
  }, [table]);

  if (!updatedTable) {
    return (
      <BackofficeLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography>Table Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/table");
            }}
            variant="contained"
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
              mt: 1,
            }}
          >
            Back
          </Button>
        </Box>
      </BackofficeLayout>
    );
  }

  const handleUpdate = () => {
    if (!updatedTable.name.trim()) {
      console.log("hello");
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required data" })
      );
    }
    dispatch(
      updateTable({
        ...updatedTable,
        locationId: selectedLocation?.id as number,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "updated successfully" })
          );
          router.push("/backoffice/table");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to update" })
          );
        },
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteTable({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "deleted successfully" })
          );
          router.push("/backoffice/table");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to delete" })
          );
        },
      })
    );
  };

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ width: 400 }}>
        <TextField
          defaultValue={updatedTable.name}
          sx={{ width: "100%" }}
          onChange={(e) =>
            setUpdatedTable({ ...updatedTable, name: e.target.value })
          }
        />
        <Button
          variant="contained"
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
            mt: 1,
            width: "fit-content",
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Table"
        content="table"
        open={open}
        setOpen={setOpen}
        onDelete={handleDelete}
      />
    </BackofficeLayout>
  );
};

export default TableDetails;
