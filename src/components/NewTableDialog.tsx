/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { createTable } from "@/store/slices/tableSlice";
import { CreateTablePayload } from "@/types/table";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultTable = {
  name: "",
  locationId: undefined,
  assetUrl: "",
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newTable, setNewTable] = useState<CreateTablePayload>(defaultTable);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { selectedLocation } = useAppSelector((store) => store.app);

  const handleCreate = () => {
    if (!newTable.name || !selectedLocation?.id) {
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required data" })
      );
    }
    dispatch(
      createTable({
        ...newTable,
        locationId: selectedLocation?.id,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "created table successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "failed to create" })
          );
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => {
            setNewTable({ ...newTable, name: e.target.value });
          }}
          sx={{ width: "100%", mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
          }}
        >
          cancel
        </Button>
        <Button
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
          }}
          variant="contained"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <CircularProgress size={20} sx={{ color: "white" }} />
              Create
            </Box>
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
