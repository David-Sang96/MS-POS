/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/addonSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateAddonPayload } from "@/types/addon";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import SingleSelectInput from "./SingleSelectInput";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultNewAddon = {
  name: "",
  price: 0,
  addonCategoryId: undefined,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newAddon, setNewAddon] = useState<CreateAddonPayload>(defaultNewAddon);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { addonCategories } = useAppSelector((store) => store.addonCategory);

  useEffect(() => {
    setNewAddon({ ...newAddon, addonCategoryId: selectedId });
  }, [selectedId]);

  const handleCreate = () => {
    if (!newAddon.name.trim() || !newAddon.addonCategoryId) {
      return dispatch(
        openSneakbar({
          type: "error",
          message: "Missing required data.",
        })
      );
    }
    dispatch(
      createAddon({
        ...newAddon,
        addonCategoryId: selectedId,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "New Addon is created.",
            })
          );
          setOpen(false);
          setSelectedId(undefined);
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
        setSelectedId(undefined);
      }}
    >
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
          sx={{ width: "100%", mt: 1 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) =>
            setNewAddon({ ...newAddon, price: Number(e.target.value) })
          }
          sx={{ width: "100%", my: 1 }}
        />
        <SingleSelectInput
          title="Addon Category"
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          items={addonCategories}
        />
        <FormControl fullWidth>
          <InputLabel>Addon Category</InputLabel>
          <Select
            value={selectedId}
            label="Addon Category"
            onChange={(e) => setSelectedId(e.target.value as number)}
          >
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
            setSelectedId(undefined);
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
