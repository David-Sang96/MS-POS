import { config } from "@/config";
import {
  CreateLocationPayload,
  DeleteLocationPayload,
  LocationSlice,
  UpdateLocationPayload,
} from "@/types/location";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  isError: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (payload: CreateLocationPayload, thunkApi) => {
    const { onSuccess, onError, ...newLocation } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      });
      const { location } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(addLocation(location));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (payload: UpdateLocationPayload, thunkApi) => {
    const { onError, onSuccess, ...updateLocation } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateLocation),
      });
      const { updatedLocation } = await response.json();
      thunkApi.dispatch(replaceLocation(updatedLocation));
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (payload: DeleteLocationPayload, thunkApi) => {
    const { onSuccess, onError, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/location?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      thunkApi.dispatch(removeLocation(id));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setLocation, addLocation, replaceLocation, removeLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
