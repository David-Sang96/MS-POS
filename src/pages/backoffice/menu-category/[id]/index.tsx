/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const [editMenuCategory, setEditMenuCategory] = useState<MenuCategory>();
  const router = useRouter();
  const id = Number(router.query.id);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);
  const menuCategory = menuCategories.find((item) => item.id === id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menuCategory) {
      setEditMenuCategory(menuCategory);
    }
  }, []);

  if (!editMenuCategory) {
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
      editMenuCategory.name.trim() === menuCategory?.name.trim() ||
      editMenuCategory.isAvailable === menuCategory?.isAvailable
    ) {
      return router.push("/backoffice/menu-category");
    }
    console.log("hi");
    dispatch(
      updateMenuCategory({
        ...editMenuCategory,
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

  return (
    <BackofficeLayout>
      <Box
        sx={{ maxWidth: 350, display: "flex", flexDirection: "column", ml: 4 }}
      >
        <TextField
          defaultValue={editMenuCategory.name}
          onChange={(e) =>
            setEditMenuCategory({ ...editMenuCategory, name: e.target.value })
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={editMenuCategory.isAvailable}
              onChange={(e, value) =>
                setEditMenuCategory({ ...editMenuCategory, isAvailable: value })
              }
            />
          }
          label="Available"
        />
        <Button
          disabled={
            editMenuCategory.name === menuCategory?.name &&
            editMenuCategory.isAvailable === menuCategory.isAvailable
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
    </BackofficeLayout>
  );
};

export default MenuCategoryDetails;
