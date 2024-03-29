import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LocationSlice {}

const initialState: LocationSlice = {};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/location`);
      const {} = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
});

export const {} = locationSlice.actions;
export default locationSlice.reducer;
