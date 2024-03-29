import { createSlice } from "@reduxjs/toolkit";

interface MenuAddonCategorySlice {}

const initialState: MenuAddonCategorySlice = {};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {},
});

export const {} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
