import {
  MenuCategory,
  MenuCategorySlice,
  NewMenuCategory,
} from "@/types/menuCategory";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategorySlice = {
  menuCategory: [],
  isLoading: false,
  isError: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (newMenuCategory: NewMenuCategory, thunkApi) => {
    const { onSuccess, onError, ...menuCategory } = newMenuCategory;
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuCategory),
    });
    const data = await response.json();
    thunkApi.dispatch(setMenuCategory(data));
  }
);

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategory: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategory = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategory = [...state.menuCategory, action.payload];
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategory = state.menuCategory.filter(
        (menuCategory) => menuCategory !== action.payload
      );
    },
  },
});

export const { setMenuCategory, addMenuCategory, removeMenuCategory } =
  menuCategorySlice.actions;

export default menuCategorySlice.reducer;
