import { DisableLocationMenuSlice } from "@/types/disableLocationMenu";
import { DisabledLocationMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuSlice = {
  disableLocationMenus: [],
  isLoading: false,
  isError: null,
};

export const disableLocationMenuCategorySlice = createSlice({
  name: "disableMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenus: (
      state,
      action: PayloadAction<DisabledLocationMenu[]>
    ) => {
      state.disableLocationMenus = action.payload;
    },
  },
});

export const { setDisableLocationMenus } =
  disableLocationMenuCategorySlice.actions;

export default disableLocationMenuCategorySlice.reducer;
