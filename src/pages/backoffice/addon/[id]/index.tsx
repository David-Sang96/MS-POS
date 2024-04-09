import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateAddonPayload } from "@/types/addon";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetails = () => {
  const [updatedAddon, setUpdatedAddon] = useState<UpdateAddonPayload>();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const router = useRouter();
  const id = Number(router.query.id);
  const { addons } = useAppSelector((store) => store.addon);
  const addon = addons.find((item) => item.id === id);
  const dispatch = useAppDispatch();
  const { addonCategories } = useAppSelector((store) => store.addonCategory);
  const selectedAddonCategoryId = addonCategories.find(
    (addonCategory) => addonCategory.id === addon?.addonCategoryId
  );

  useEffect(() => {
    if (addon && selectedAddonCategoryId) {
      setUpdatedAddon(addon);
      setSelectedId(selectedAddonCategoryId.id);
    }
  }, [addon, selectedAddonCategoryId]);

  if (!updatedAddon) {
    return (
      <BackofficeLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography>Addon category Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/addon-category");
            }}
            variant="contained"
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
              mt: 1,
            }}
          >
            Back
          </Button>
        </Box>
      </BackofficeLayout>
    );
  }

  const handleUpdate = () => {
    if (!updatedAddon.name.trim()) {
      dispatch(
        openSneakbar({ type: "error", message: "Missing required data" })
      );
    }

    dispatch(
      updateAddon({
        ...updatedAddon,
        addonCategoryId: selectedId as number,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "updated successfully" })
          );
          setOpen(false);
          router.push("/backoffice/addon");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "failed to update" })
          );
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteAddon({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "deleted successfully" })
          );
          router.push("/backoffice/addon");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "failed to delete" })
          );
        },
      })
    );
  };

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ width: 400, ml: 2 }}>
        <TextField
          defaultValue={updatedAddon.name}
          onChange={(e) =>
            setUpdatedAddon({ ...updatedAddon, name: e.target.value })
          }
          sx={{ width: "100%" }}
        />
        <TextField
          type="number"
          defaultValue={updatedAddon.price}
          onChange={(e) =>
            setUpdatedAddon({ ...updatedAddon, price: Number(e.target.value) })
          }
          sx={{ width: "100%", my: 2 }}
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
        <Box>
          <Button
            variant="contained"
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
              mt: 1,
              width: "fit-content",
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Addon"
          content="addon"
          open={open}
          setOpen={setOpen}
          onDelete={handleDelete}
        />
      </Box>
    </BackofficeLayout>
  );
};

export default AddonDetails;
