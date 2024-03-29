import { config } from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCompany } from "./companySlice";
import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";

interface AppSlice {
  init: boolean;
  isLoading: boolean;
  isError: Error | null;
}

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  isError: null,
};

export const appData = createAsyncThunk("app/appData", async (_, thunkApi) => {
  try {
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    const { menus, menuCategories, company } = await response.json();
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setMenuCategory(menuCategories));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setInit(true));
  } catch (error) {
    console.error(error);
  }
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;
