import { Menu, MenuSlice, NewMenu } from "@/types/menu";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  isError: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (newMenu: NewMenu, thunkApi) => {
    const { onSuccess, onError, ...menu } = newMenu;
    const response = await fetch("http://localhost:5000/api/backoffice/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });
    const data = await response.json();
    onSuccess && onSuccess();
    return data;
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
        state.menus = action.payload;
        state.isLoading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export const { setMenu, addMenu, removeMenu } = menuSlice.actions;

export default menuSlice.reducer;
