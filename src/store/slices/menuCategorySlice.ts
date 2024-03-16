import { config } from "@/config";
import {
  CreateMenuCategoryPayload,
  MenuCategory,
  MenuCategorySlice,
} from "@/types/menuCategory";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategorySlice = {
  menuCategory: [],
  isLoading: false,
  isError: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: CreateMenuCategoryPayload, thunkApi) => {
    const { onSuccess, onError, ...newMenuCategory } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuCategory),
      }
    );
    const { menuCategory } = await response.json();
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenuCategory(menuCategory));
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
