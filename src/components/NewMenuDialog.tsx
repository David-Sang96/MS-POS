import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateMenuPayload } from "@/types/menu";
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

const defaultNewMenu = {
  name: "",
  price: 0,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newMenu, setNewMenu] = useState<CreateMenuPayload>(defaultNewMenu);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);

  const handleCreate = () => {
    if (!newMenu.name) {
      dispatch(
        openSneakbar({
          type: "error",
          message: "name is required.",
        })
      );
    }
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New menu is created.",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            openSneakbar({
              type: "error",
              message: "Failed to create new menu.",
            })
          );
        },
      })
    );
    setNewMenu(defaultNewMenu);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewMenu(defaultNewMenu);
      }}
    >
      <DialogTitle>Create New Menu</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          sx={{ width: "100%", my: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewMenu({ ...newMenu, price: Number(e.target.value) })
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
            setNewMenu(defaultNewMenu);
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
