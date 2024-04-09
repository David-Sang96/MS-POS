/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateMenuCategoryPayload } from "@/types/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const [updatedMenuCategory, setUpdatedMenuCategory] =
    useState<UpdateMenuCategoryPayload>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);
  const menuCategory = menuCategories.find((item) => item.id === id);
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((store) => store.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (store) => store.disableLocationMenuCategory
  );
  const isAvailable = disableLocationMenuCategories.find(
    (item) =>
      item.menuCategoryId === menuCategory?.id &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true;

  useEffect(() => {
    if (menuCategory) {
      setUpdatedMenuCategory({
        ...menuCategory,
        locationId: selectedLocation?.id,
        isAvailable,
      });
    }
  }, [menuCategory]);

  if (!updatedMenuCategory) {
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
          <Typography>Menu Category Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/menu-category");
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
    if (
      !updatedMenuCategory.name.trim() &&
      updatedMenuCategory.isAvailable === isAvailable
    ) {
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required data." })
      );
    }
    dispatch(
      updateMenuCategory({
        ...updatedMenuCategory,
        onSuccess: () => {
          dispatch(
            openSneakbar({
              type: "success",
              message: "updated menuCategory successfully",
            })
          );
          router.push("/backoffice/menu-category");
        },
        onError: () => {
          dispatch(
            openSneakbar({
              type: "error",
              message: "failed to update menuCategory",
            })
          );
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteMenuCategory({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Deleted Menu Category" })
          );
          setOpen(false);
          router.push("/backoffice/menu-category");
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
      <Box
        sx={{ maxWidth: 350, display: "flex", flexDirection: "column", ml: 4 }}
      >
        <TextField
          defaultValue={updatedMenuCategory.name}
          onChange={(e) =>
            setUpdatedMenuCategory({
              ...updatedMenuCategory,
              name: e.target.value,
            })
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvailable}
              onChange={(e, value) =>
                setUpdatedMenuCategory({
                  ...updatedMenuCategory,
                  isAvailable: value,
                })
              }
            />
          }
          label="Available"
        />
        <Button
          disabled={
            updatedMenuCategory.name.trim() === menuCategory?.name.trim() &&
            updatedMenuCategory.isAvailable === isAvailable
          }
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
        open={open}
        setOpen={setOpen}
        content="menuCategory"
        title="Delete MenuCategory"
        onDelete={handleDelete}
      />
    </BackofficeLayout>
  );
};

export default MenuCategoryDetails;
