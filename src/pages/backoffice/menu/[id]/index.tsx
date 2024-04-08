/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateMenuPayload } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetails = () => {
  const [updatedMenu, setUpdatedMenu] = useState<UpdateMenuPayload>();
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const { menus } = useAppSelector((store) => store.menu);
  const { menuCategories } = useAppSelector((store) => store.menuCategory);
  const { menuCategoryMenus } = useAppSelector(
    (store) => store.menuCategoryMenu
  );
  const menu = menus.find((item) => item.id === id);
  const selectedMenuCategoryIds = menuCategoryMenus
    .filter((item) => item.menuId === id)
    .map((item) => {
      const menuCategory = menuCategories.find(
        (menuCategory) => menuCategory.id === item.menuCategoryId
      ) as MenuCategory;
      return menuCategory.id;
    });
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((store) => store.app);
  const { disableLocationMenus } = useAppSelector(
    (store) => store.disableLocationMenu
  );
  const isAvailable = disableLocationMenus.find(
    (item) => item.locationId === selectedLocation?.id && item.menuId === id
  )
    ? false
    : true;

  useEffect(() => {
    if (menu) {
      setUpdatedMenu({
        ...menu,
        isAvailable,
        locationId: selectedLocation?.id,
      });
      setSelectedItem(selectedMenuCategoryIds);
    }
  }, [menu]);

  const handleUpdate = () => {
    if (!updatedMenu?.name || selectedItem.length === 0) {
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required Data." })
      );
    }
    dispatch(
      updateMenu({
        ...updatedMenu,
        menuCategoryIds: selectedItem,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "updated successfully" })
          );
          router.push("/backoffice/menu");
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
      deleteMenu({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Deleted successfully" })
          );
          setOpen(false);
          router.push("/backoffice/menu");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "failed to delete" })
          );
        },
      })
    );
  };

  if (!updatedMenu) {
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
          <Typography>Menu Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/menu");
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

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ width: 400, ml: 3 }}>
        <TextField
          value={updatedMenu.name}
          onChange={(e) =>
            setUpdatedMenu({ ...updatedMenu, name: e.target.value })
          }
          sx={{ width: "100%" }}
        />
        <TextField
          value={updatedMenu.price}
          onChange={(e) =>
            setUpdatedMenu({ ...updatedMenu, price: Number(e.target.value) })
          }
          sx={{ width: "100%", my: 2 }}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>MenuCategory</InputLabel>
          <Select
            multiple
            value={selectedItem}
            renderValue={() =>
              selectedItem
                .map(
                  (itemId) =>
                    menuCategories.find(
                      (menuCategory) => menuCategory.id === itemId
                    ) as MenuCategory
                )
                .map((item) => item?.name)
                .join(", ")
            }
            onChange={(e) => {
              const selected = e.target.value as number[];
              setSelectedItem(selected);
            }}
            input={<OutlinedInput label="MenuCategory" />}
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={selectedItem.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvailable}
              onChange={(e, value) => {
                setUpdatedMenu({ ...updatedMenu, isAvailable: value });
              }}
            />
          }
          label="Available"
          sx={{ width: "100%", mt: 1 }}
        />
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
        open={open}
        setOpen={setOpen}
        content="menu"
        title="Delete Menu"
        onDelete={handleDelete}
      />
    </BackofficeLayout>
  );
};

export default MenuDetails;
