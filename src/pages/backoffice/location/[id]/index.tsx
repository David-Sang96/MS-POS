/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/appSlice";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import { openSneakbar } from "@/store/slices/sneakbarSlice";
import { UpdateLocationPayload } from "@/types/location";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetails = () => {
  const [updatedLocation, setUpdatedLocation] =
    useState<UpdateLocationPayload>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const { locations } = useAppSelector((store) => store.location);
  const location = locations.find((item) => item.id === id);
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((store) => store.app);

  useEffect(() => {
    if (location) {
      setUpdatedLocation(location);
    }
  }, [location]);

  if (!updatedLocation) {
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
          <Typography>Location Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/location");
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
    dispatch(
      updateLocation({
        ...updatedLocation,
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Updated Successfully" })
          );
          setOpen(false);
          router.push("/backoffice/location");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to Update" })
          );
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteLocation({
        id,
        onSuccess: () => {
          dispatch(
            openSneakbar({ type: "success", message: "Deleted Successfully" })
          );
          setOpen(false);
          router.push("/backoffice/location");
        },
        onError: () => {
          dispatch(
            openSneakbar({ type: "error", message: "Failed to Delete" })
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
      <Box sx={{ width: 400, ml: 4 }}>
        <TextField
          defaultValue={updatedLocation.name}
          onChange={(e) =>
            setUpdatedLocation({ ...updatedLocation, name: e.target.value })
          }
          sx={{ width: "100%", mb: 1 }}
        />
        <TextField
          defaultValue={updatedLocation.street}
          onChange={(e) =>
            setUpdatedLocation({ ...updatedLocation, street: e.target.value })
          }
          sx={{ width: "100%", my: 1 }}
        />
        <TextField
          defaultValue={updatedLocation.township}
          onChange={(e) =>
            setUpdatedLocation({ ...updatedLocation, township: e.target.value })
          }
          sx={{ width: "100%", my: 1 }}
        />
        <TextField
          defaultValue={updatedLocation.city}
          onChange={(e) =>
            setUpdatedLocation({ ...updatedLocation, city: e.target.value })
          }
          sx={{ width: "100%", my: 1 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={selectedLocation?.id === id}
              onChange={() => {
                if (location) {
                  dispatch(setSelectedLocation(location));
                  localStorage.setItem(
                    "selectedLocationId",
                    String(location.id)
                  );
                }
              }}
            />
          }
          label="Current Location"
        />
        <Box>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
              mt: 1,
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        content="location"
        onDelete={handleDelete}
      />
    </BackofficeLayout>
  );
};

export default LocationDetails;
