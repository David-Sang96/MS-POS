import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCompany, updateCompany } from "@/store/slices/companySlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateCompanyPayload } from "@/types/company";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Setting = () => {
  const [updateData, setUpdateData] = useState<UpdateCompanyPayload>();
  const company = useAppSelector(selectCompany);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) {
      setUpdateData(company);
    }
  }, [company]);

  if (!updateData) {
    return (
      <BackofficeLayout>
        <Typography>Company Not Found</Typography>
      </BackofficeLayout>
    );
  }
  const handleUpdate = () => {
    if (
      !updateData.city.trim() ||
      !updateData.name.trim() ||
      !updateData.street.trim() ||
      !updateData.township.trim()
    ) {
      return dispatch(
        openSneakbar({ type: "error", message: "Missing required data" })
      );
    }
    dispatch(
      updateCompany({
        ...updateData,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "updated successfully" })
          );
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to update" })
          );
        },
      })
    );
  };

  return (
    <BackofficeLayout>
      <Box sx={{ width: 400 }}>
        <TextField
          placeholder=""
          defaultValue={updateData.name}
          sx={{ width: "100%" }}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        />
        <TextField
          placeholder=""
          defaultValue={updateData.street}
          sx={{ width: "100%", my: 1 }}
          onChange={(e) =>
            setUpdateData({ ...updateData, street: e.target.value })
          }
        />
        <TextField
          placeholder=""
          defaultValue={updateData.township}
          sx={{ width: "100%", my: 1 }}
          onChange={(e) =>
            setUpdateData({ ...updateData, township: e.target.value })
          }
        />
        <TextField
          placeholder=""
          defaultValue={updateData.city}
          sx={{ width: "100%", mb: 1 }}
          onChange={(e) =>
            setUpdateData({ ...updateData, city: e.target.value })
          }
        />
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
        onClick={handleUpdate}
      >
        Update
      </Button>
    </BackofficeLayout>
  );
};

export default Setting;
