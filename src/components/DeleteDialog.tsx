import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  content: string;
  title: string;
  setOpen: (value: boolean) => void;
  onDelete: () => void;
}

const DeleteDialog = ({ open, setOpen, title, content, onDelete }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>Are you sure you want to delete {content} ?</DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          sx={{ color: "#222831" }}
          variant="text"
        >
          cancel
        </Button>
        <Button
          onClick={onDelete}
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
          }}
          variant="contained"
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
