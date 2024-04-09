import { MenuCategoryMenusSlice } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenusSlice = {
  menuCategoryMenus: [],
  isLoading: false,
  isError: null,
};

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (
      state,
      action: PayloadAction<MenuCategoryMenu[]>
    ) => {
      state.menuCategoryMenus = action.payload;
    },
    addMenuCategoryMenu: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.menuCategoryMenus = [...state.menuCategoryMenus, ...action.payload];
    },
    removeMenuCategoryMenu: (state, action: PayloadAction<number>) => {
      state.menuCategoryMenus = state.menuCategoryMenus.filter(
        (item) => item.menuId !== action.payload
      );
    },
  },
});

export const {
  setMenuCategoryMenus,
  addMenuCategoryMenu,
  removeMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
