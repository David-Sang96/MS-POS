/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddonCategory } from "@/store/slices/addonCategorySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateAddonCategoryPayload } from "@/types/addonCategory";
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
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetails = () => {
  const [open, setOpen] = useState(false);
  const [updateAddonCategory, setUpdateAddonCategory] =
    useState<UpdateAddonCategoryPayload>();
  const [menuIds, setMenuIds] = useState<number[]>([]);
  const router = useRouter();
  const id = Number(router.query.id);
  const { addonCategories } = useAppSelector((store) => store.addonCategory);
  const addonCategory = addonCategories.find((item) => item.id === id);
  const { menuAddonCategories } = useAppSelector(
    (store) => store.menuAddonCategory
  );
  const selectedMenuIds = menuAddonCategories
    .filter((item) => item.addonCategoryId === id)
    .map((item) => item.menuId);
  const { menus } = useAppSelector((store) => store.menu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addonCategory) {
      setUpdateAddonCategory({ ...addonCategory, menuIds: selectedMenuIds });
      setMenuIds(selectedMenuIds);
    }
  }, [addonCategory]);

  if (!updateAddonCategory) {
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

  const handelDelete = () => {
    dispatch(
      deleteAddonCategory({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Deleted Addon Category" })
          );
          setOpen(false);
          router.push("/backoffice/addon-category");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to delete" })
          );
        },
      })
    );
  };
  const handelUpdate = () => {};

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ width: 400, ml: 2 }}>
        <TextField defaultValue={addonCategory?.name} sx={{ width: "100%" }} />
        <FormControl sx={{ width: "100%", my: 2 }}>
          <InputLabel>Menu</InputLabel>
          <Select
            multiple
            value={menuIds}
            onChange={(e) => {
              const selectedValue = e.target.value as number[];
              setMenuIds(selectedValue);
            }}
            renderValue={() =>
              menuIds
                .map(
                  (menuId) => menus.find((item) => item.id === menuId) as Menu
                )
                .map((item) => item?.name)
                .join(", ")
            }
            input={<OutlinedInput label="Menu" />}
          >
            {menus.map((menu) => {
              return (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox checked={menuIds.includes(menu.id)} />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box>
          <FormControlLabel control={<Checkbox />} label="required" />
        </Box>
        <Button
          variant="contained"
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
            mt: 1,
            width: "fit-content",
          }}
          onClick={handelUpdate}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        content="addonCategory"
        title="AddonCategory"
        onDelete={handelDelete}
      />
    </BackofficeLayout>
  );
};

export default AddonCategoryDetails;
