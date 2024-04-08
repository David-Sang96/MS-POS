import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { CreateLocationPayload } from "@/types/location";
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

const defaultNewLocation = {
  name: "",
  street: "",
  city: "",
  township: "",
  companyId: undefined,
};

const DialogBox = ({ open, setOpen }: Props) => {
  const [newLocation, setNewLocation] =
    useState<CreateLocationPayload>(defaultNewLocation);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);
  const { company } = useAppSelector((store) => store.company);

  const handleCreate = () => {
    const isValid =
      newLocation.city &&
      newLocation.name &&
      newLocation.street &&
      newLocation.township;
    if (!isValid) {
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required Data" })
      );
    }
    dispatch(
      createLocation({
        ...newLocation,
        companyId: company?.id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Created successfully" })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to create" })
          );
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>Create New Location</DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          type="text"
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
          sx={{ width: "100%", my: 1 }}
        />
        <TextField
          label="street"
          type="text"
          onChange={(e) => {
            setNewLocation({ ...newLocation, street: e.target.value });
          }}
          sx={{ width: "100%", my: 1 }}
        />
        <TextField
          label="township"
          type="text"
          onChange={(e) => {
            setNewLocation({ ...newLocation, township: e.target.value });
          }}
          sx={{ width: "100%", my: 1 }}
        />
        <TextField
          label="city"
          type="text"
          onChange={(e) => {
            setNewLocation({ ...newLocation, city: e.target.value });
          }}
          sx={{ width: "100%", my: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button
          sx={{ color: "#222831" }}
          variant="text"
          onClick={() => {
            setOpen(false);
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
