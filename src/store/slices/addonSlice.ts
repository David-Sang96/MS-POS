import { config } from "@/config";
import {
  AddonSlice,
  CreateAddonPayload,
  DeleteAddonPayload,
  UpdateAddonPayload,
} from "@/types/addon";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  isError: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: CreateAddonPayload, thunkApi) => {
    const { onSuccess, onError, ...newAddon } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddon),
      });
      const { addon } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(addAddon(addon));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (payload: UpdateAddonPayload, thunkApi) => {
    const { onSuccess, onError, ...updatedAddon } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddon),
      });
      const { addon } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(replaceAddon(addon));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (payload: DeleteAddonPayload, thunkApi) => {
    const { onError, onSuccess, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/addon?id=${id}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
      thunkApi.dispatch(removeAddon(id));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setAddons, addAddon, replaceAddon, removeAddon } =
  addonSlice.actions;
export default addonSlice.reducer;
