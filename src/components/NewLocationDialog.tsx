import { useAppDispatch, useAppSelector } from "@/store/hooks";
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

const DialogBox = ({ open, setOpen }: Props) => {
  const [newLocation, setNewLocation] = useState();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menu);

  const handleCreate = () => {};

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
          label="Name"
          type="text"
          onChange={(e) => {}}
          sx={{ width: "100%", my: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          onChange={(e) => {}}
          sx={{ width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
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
