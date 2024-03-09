import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSneakbar } from "@/store/slices/sneakbarSlice";
import { Alert, Snackbar } from "@mui/material";

const SnackBarBox = () => {
  const { open, type, message } = useAppSelector((store) => store.sneakbar);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(closeSneakbar())}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionProps={{ timeout: 0 }}
    >
      <Alert
        severity={type}
        sx={{ width: "100%" }}
        onClose={() => dispatch(closeSneakbar())}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarBox;
