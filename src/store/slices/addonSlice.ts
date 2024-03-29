import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AddonSlice {}

const initialState: AddonSlice = {};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`);
      const {} = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {},
});

export const {} = addonSlice.actions;
export default addonSlice.reducer;
