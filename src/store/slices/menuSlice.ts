import { config } from "@/config";
import {
  CreateMenuPayload,
  DeleteMenuPayload,
  MenuSlice,
  UpdateMenuPayload,
} from "@/types/menu";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDisableLocationMenus } from "./disableLocationMenuSlice";
import {
  addMenuCategoryMenu,
  removeMenuCategoryMenu,
  setMenuCategoryMenus,
} from "./menuCategoryMenuSlice";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  isError: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuPayload, thunkApi) => {
    const { onSuccess, onError, ...newMenu } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    const { menu, menuCategoryMenus } = await response.json();
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenuCategoryMenu(menuCategoryMenus));
    return menu;
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload: UpdateMenuPayload, thunkApi) => {
    const { onSuccess, onError, ...updateMenu } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateMenu),
      });
      const { menu, disabledLocationMenus, menuCategoryMenus } =
        await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(replaceMenu(menu));
      thunkApi.dispatch(setDisableLocationMenus(disabledLocationMenus));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (payload: DeleteMenuPayload, thunkApi) => {
    const { onError, onSuccess, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/menu?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onSuccess && onSuccess();
      thunkApi.dispatch(removeMenu(id));
      thunkApi.dispatch(removeMenuCategoryMenu(id));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
    },
    replaceMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action: PayloadAction<number>) => {
      state.menus = state.menus.filter((menu) => menu.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMenu.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menus = [...state.menus, action.payload];
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export const { setMenu, addMenu, removeMenu, replaceMenu } = menuSlice.actions;

export default menuSlice.reducer;
