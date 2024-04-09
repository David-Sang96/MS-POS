import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
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
  companyId: undefined,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>(defaultNewMenuCategory);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menuCategory);
  const { company } = useAppSelector((store) => store.company);

  const handleCreate = () => {
    if (!newMenuCategory.name.trim()) {
      console.log("hi");
      return dispatch(
        openSneakbar({
          type: "error",
          message: "Missing required Data",
        })
      );
    }
    dispatch(
      createMenuCategory({
        ...newMenuCategory,
        companyId: company?.id,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New menuCategory is created.",
            })
          );
          setOpen(false);
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
          sx={{ width: "100%", mt: 2 }}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={newMenuCategory.isAvailable}
              onChange={(e, value) =>
                setNewMenuCategory({ ...newMenuCategory, isAvailable: value })
              }
            />
          }
          label="Available"
        /> */}
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
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
