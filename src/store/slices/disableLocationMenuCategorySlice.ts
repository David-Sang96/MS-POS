import { DisableLocationMenuCategorySlice } from "@/types/disableLocationMenuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  isError: null,
};

export const disableLocationMenuSlice = createSlice({
  name: "disableMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategories: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory[]>
    ) => {
      state.disableLocationMenuCategories = action.payload;
    },
  },
});

export const { setDisableLocationMenuCategories } =
  disableLocationMenuSlice.actions;

export default disableLocationMenuSlice.reducer;
