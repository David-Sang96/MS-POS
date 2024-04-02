import { config } from "@/config";
import {
  CreateMenuCategoryPayload,
  DeleteMenuCategoryPayload,
  MenuCategorySlice,
  UpdateMenuCategoryPayload,
} from "@/types/menuCategory";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  isError: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: CreateMenuCategoryPayload, thunkApi) => {
    const { onSuccess, onError, ...newMenuCategory } = payload;
    try {
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
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const updateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async (payload: UpdateMenuCategoryPayload, thunkApi) => {
    const { onError, onSuccess, ...editedMenuCategory } = payload;
    try {
      const response = await fetch(
        `${config.backofficeApiBaseUrl}/menu-category`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedMenuCategory),
        }
      );
      const { updatedMenuCategory } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(replaceMenuCategory(updatedMenuCategory));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const deleteMenuCategory = createAsyncThunk(
  "menuCategory/deleteMenuCategory",
  async (payload: DeleteMenuCategoryPayload, thunkApi) => {
    const { onSuccess, onError, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/menu-category?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      thunkApi.dispatch(removeMenuCategory(id));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategory: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCategory: (state, action: PayloadAction<number>) => {
      state.menuCategories = state.menuCategories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setMenuCategory,
  addMenuCategory,
  removeMenuCategory,
  replaceMenuCategory,
} = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
