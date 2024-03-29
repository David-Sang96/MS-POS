import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MenuCategorySlice {}

const initialState: MenuCategorySlice = {};

export const createMenuCategoryMenu = createAsyncThunk(
  "menuCategoryMenu/createMenuCategoryMenu",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}`);
      const {} = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {},
});

export const {} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
