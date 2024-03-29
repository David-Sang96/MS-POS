import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AddonCategorySlice {}

const initialState: AddonCategorySlice = {};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(
        `${config.backofficeApiBaseUrl}/addon-category`
      );
      const {} = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {},
});

export const {} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
