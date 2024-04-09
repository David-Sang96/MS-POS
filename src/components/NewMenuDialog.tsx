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
import MultiSelectInput from "./MultiSelectInput";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultNewMenu = {
  name: "",
  price: 0,
  menuCategoryIds: [],
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newMenu, setNewMenu] = useState<CreateMenuPayload>(defaultNewMenu);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);

  const handleCreate = () => {
    if (!newMenu.name.trim() || !selectedIds.length) {
      return dispatch(
        openSneakbar({
          type: "error",
          message: "Missing required Data.",
        })
      );
    }
    dispatch(
      createMenu({
        ...newMenu,
        menuCategoryIds: selectedIds,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New menu is created.",
            })
          );
          setOpen(false);
          setSelectedIds([]);
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
        setSelectedIds([]);
      }}
    >
      <DialogTitle>Create New Menu</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          sx={{ width: "100%", mt: 1 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewMenu({ ...newMenu, price: Number(e.target.value) })
          }
          sx={{ width: "100%", my: 2 }}
        />
        <MultiSelectInput
          title="Menu Category"
          items={menuCategories}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
            setSelectedIds([]);
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
