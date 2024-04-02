import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateMenuPayload } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useState } from "react";

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
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);

  const handleCreate = () => {
    if (!newMenu.name || newMenu.menuCategoryIds.length === 0) {
      return dispatch(
        openSneakbar({
          type: "error",
          message: "Please filled up all fields.",
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
          sx={{ width: "100%", mt: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewMenu({ ...newMenu, price: Number(e.target.value) })
          }
          sx={{ width: "100%", my: 2 }}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>MenuCategory</InputLabel>
          <Select
            input={<OutlinedInput label="MenuCategory" />}
            multiple
            value={newMenu.menuCategoryIds}
            onChange={(evt) => {
              const item = evt.target.value as number[];
              setNewMenu({ ...newMenu, menuCategoryIds: item });
            }}
            renderValue={() =>
              newMenu.menuCategoryIds
                .map(
                  (itemId) =>
                    menuCategories.find(
                      (menuCategory) => menuCategory.id === itemId
                    ) as MenuCategory
                )
                .map((item) => item.name)
                .join(", ")
            }
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
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
