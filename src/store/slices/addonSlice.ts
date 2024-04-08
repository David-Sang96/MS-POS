import { config } from "@/config";
import { AddonSlice } from "@/types/addon";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  isError: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`);
      const {} = await response.json();
    } catch (error) {
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
