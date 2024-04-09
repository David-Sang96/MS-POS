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
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import MultiSelectInput from "./MultiSelectInput";

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
          setSelectedMenuIds([]);
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
        <MultiSelectInput
          title="Menu"
          selectedIds={selectedMenuIds}
          setSelectedIds={setSelectedMenuIds}
          items={menus}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={newAddonCategory.isRequired}
              onChange={(e, value) =>
                setNewAddonCategory({ ...newAddonCategory, isRequired: value })
              }
            />
          }
          label="Required"
        />
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
