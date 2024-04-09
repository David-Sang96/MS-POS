import { config } from "@/config";
import {
  AddonCategorySlice,
  CreateAddonCategoryPayload,
  DeleteAddonCategoryPayload,
  UpdateAddonCategoryPayload,
} from "@/types/addonCategory";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMenuAddonCategory,
  removeMenuAddonCategory,
  setMenuAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategorySlice = {
  addonCategories: [],
  isLoading: false,
  isError: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload: CreateAddonCategoryPayload, thunkApi) => {
    const { onError, onSuccess, ...newAddonCategory } = payload;
    try {
      const response = await fetch(
        `${config.backofficeApiBaseUrl}/addon-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddonCategory),
        }
      );
      const { addonCategory, menuAddonCategory } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(addAddonCategory(addonCategory));
      thunkApi.dispatch(addMenuAddonCategory(menuAddonCategory));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const updateAddonCategory = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (payload: UpdateAddonCategoryPayload, thunkApi) => {
    const { onSuccess, onError, ...updateAddonCategory } = payload;
    try {
      const response = await fetch(
        `${config.backofficeApiBaseUrl}/addon-category`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAddonCategory),
        }
      );
      const { addonCategory, menuAddonCategories } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(replaceAddonCategory(addonCategory));
      thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "addonCategory/deleteAddonCategory",
  async (payload: DeleteAddonCategoryPayload, thunkApi) => {
    const { onSuccess, onError, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/addon-category?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onSuccess && onSuccess();
      thunkApi.dispatch(removeAddonCategory(id));
      thunkApi.dispatch(removeMenuAddonCategory(id));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategory,
  removeAddonCategory,
  replaceAddonCategory,
} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
