import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { NewMenuCategory } from "@/types/menuCategory";
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

const defaultNewMenuCategory = {
  name: "",
  price: 0,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newMenuCategory, setNewMenuCategory] = useState<NewMenuCategory>(
    defaultNewMenuCategory
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menuCategory);

  const handleCreate = () => {
    if (!newMenuCategory.name) {
      dispatch(
        openSneakbar({
          type: "error",
          message: "name is required.",
        })
      );
    }
    dispatch(
      createMenu({
        ...newMenuCategory,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New menuCategory is created.",
            })
          );
        },
        onError: () => {
          dispatch(
            openSneakbar({
              type: "error",
              message: "Failed to create menuCategory.",
            })
          );
        },
      })
    );
    setNewMenuCategory(defaultNewMenuCategory);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewMenuCategory(defaultNewMenuCategory);
      }}
    >
      <DialogTitle>Create New MenuCategory</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) =>
            setNewMenuCategory({ ...newMenuCategory, name: e.target.value })
          }
          sx={{ width: "100%", my: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewMenuCategory({
              ...newMenuCategory,
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
            setNewMenuCategory(defaultNewMenuCategory);
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
