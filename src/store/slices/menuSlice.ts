import { config } from "@/config";
import { CreateMenuPayload, MenuSlice } from "@/types/menu";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    const { menu } = await response.json();
    onSuccess && onSuccess();
    return menu;
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
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.filter((menu) => menu !== action.payload);
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

export const { setMenu, addMenu, removeMenu } = menuSlice.actions;

export default menuSlice.reducer;
