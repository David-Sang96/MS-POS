import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
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

const defaultNewAddon = {
  name: "",
  price: 0,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newAddon, setNewAddon] = useState(defaultNewAddon);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);

  const handleCreate = () => {
    if (!newAddon.name) {
      dispatch(
        openSneakbar({
          type: "error",
          message: "name is required.",
        })
      );
    }
    dispatch(
      createMenu({
        ...newAddon,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New Addon is created.",
            })
          );
        },
        onError: () => {
          dispatch(
            openSneakbar({
              type: "error",
              message: "Failed to create new Addon.",
            })
          );
        },
      })
    );
    setNewAddon(defaultNewAddon);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewAddon(defaultNewAddon);
      }}
    >
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
          sx={{ width: "100%", my: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewAddon({ ...newAddon, price: Number(e.target.value) })
          }
          sx={{ width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
            setNewAddon(defaultNewAddon);
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
              <CircularProgress size={20} sx={{ color: "black" }} />
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
