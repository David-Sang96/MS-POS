import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppSlice {}

const initialState = {};

export const appData = createAsyncThunk(
  "app,appData",
  async (payload, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    const {} = await response.json();
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;
export default appSlice.reducer;
