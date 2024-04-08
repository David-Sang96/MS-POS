import { config } from "@/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddonCategories } from "./addonCategorySlice";
import { setAddons } from "./addonSlice";
import { setCompany } from "./companySlice";
import { setDisableLocationMenuCategories } from "./disableLocationMenuCategorySlice";
import { setDisableLocationMenus } from "./disableLocationMenuSlice";
import { setLocation } from "./locationSlice";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setTables } from "./tableSlice";

interface AppSlice {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  isError: Error | null;
}

const initialState: AppSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  isError: null,
};

export const appData = createAsyncThunk("app/appData", async (_, thunkApi) => {
  try {
    thunkApi.dispatch(setIsLoading(true));
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    const {
      company,
      locations,
      menuCategories,
      disableLocationMenuCategories,
      menuCategoryMenus,
      menus,
      disableLocationMenus,
      menuAddonCategories,
      addonCategories,
      addons,
      tables,
    } = await response.json();
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setMenuCategory(menuCategories));
    thunkApi.dispatch(
      setDisableLocationMenuCategories(disableLocationMenuCategories)
    );
    thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setDisableLocationMenus(disableLocationMenus));
    const selectedLocationId = localStorage.getItem("selectedLocationId");
    if (selectedLocationId) {
      const selectedLocation = locations.find(
        (item: any) => item.id === Number(selectedLocationId)
      ) as Location;
      thunkApi.dispatch(setSelectedLocation(selectedLocation));
    } else {
      thunkApi.dispatch(setSelectedLocation(locations[0]));
    }
    thunkApi.dispatch(setAddonCategories(addonCategories));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    thunkApi.dispatch(setAddons(addons));
    thunkApi.dispatch(setTables(tables));
    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(setIsLoading(false));
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
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setSelectedLocation, setIsLoading } = appSlice.actions;
export default appSlice.reducer;
