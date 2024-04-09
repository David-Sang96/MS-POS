import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
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
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultNewAddonCategory = {
  name: "",
  isRequired: true,
  menuIds: [],
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newAddonCategory, setNewAddonCategory] =
    useState<CreateAddonCategoryPayload>(defaultNewAddonCategory);
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { menus } = useAppSelector((store) => store.menu);

  const handleCreate = () => {
    if (!newAddonCategory.name.trim() || !selectedMenuIds.length) {
      return dispatch(
        openSneakbar({
          type: "error",
          message: "Missing data required.",
        })
      );
    }
    dispatch(
      createAddonCategory({
        ...newAddonCategory,
        menuIds: selectedMenuIds,
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
        setSelectedMenuIds([]);
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
          sx={{ width: "100%", my: 1 }}
        />
        <FormControl sx={{ width: "100%", my: 1 }}>
          <InputLabel>Menu</InputLabel>
          <Select
            multiple
            value={selectedMenuIds}
            onChange={(e) => {
              const selectedMenuId = e.target.value as number[];
              setSelectedMenuIds(selectedMenuId);
            }}
            renderValue={() =>
              selectedMenuIds
                .map(
                  (menuId) => menus.find((item) => item.id === menuId) as Menu
                )
                .map((item) => item?.name)
                .join(", ")
            }
            input={<OutlinedInput label="Menu" />}
          >
            {menus.map((menu) => {
              return (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox checked={selectedMenuIds.includes(menu.id)} />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox />} label="Required" />
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
            setSelectedMenuIds([]);
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
