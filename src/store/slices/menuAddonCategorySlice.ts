import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategorySlice = {
  menuAddonCategories: [],
  isLoading: false,
  isError: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
    addMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = [
        ...state.menuAddonCategories,
        ...action.payload,
      ];
    },
    removeMenuAddonCategory: (state, action: PayloadAction<number>) => {
      state.menuAddonCategories = state.menuAddonCategories.filter(
        (item) => item.addonCategoryId !== action.payload
      );
    },
  },
});

export const {
  setMenuAddonCategory,
  addMenuAddonCategory,
  removeMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
