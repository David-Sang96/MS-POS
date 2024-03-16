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

const defaultNewAddonCategory = {
  name: "",
  price: 0,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newAddonCategory, setNewAddonCategory] = useState(
    defaultNewAddonCategory
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);

  const handleCreate = () => {
    if (!newAddonCategory.name) {
      dispatch(
        openSneakbar({
          type: "error",
          message: "name is required.",
        })
      );
    }
    dispatch(
      createMenu({
        ...newAddonCategory,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New AddonCategory is created.",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            openSneakbar({
              type: "error",
              message: "Failed to create new AddonCategory.",
            })
          );
        },
      })
    );
    setNewAddonCategory(defaultNewAddonCategory);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewAddonCategory(defaultNewAddonCategory);
      }}
    >
      <DialogTitle>Create New AddonCategory</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) =>
            setNewAddonCategory({ ...newAddonCategory, name: e.target.value })
          }
          sx={{ width: "100%", my: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewAddonCategory({
              ...newAddonCategory,
              price: Number(e.target.value),
            })
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
            setNewAddonCategory(defaultNewAddonCategory);
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
