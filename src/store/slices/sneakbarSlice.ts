import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type status = "success" | "error";

interface SneakBarSlice {
  type: status;
  open: boolean;
  message: string;
}

const initialState: SneakBarSlice = {
  type: "success",
  open: false,
  message: "",
};

export const sneakbarSlice = createSlice({
  name: "sneakbar",
  initialState,
  reducers: {
    openSneakbar: (
      state,
      action: PayloadAction<{
        type: status;
        message: string;
      }>
    ) => {
      const { type, message } = action.payload;
      state.open = true;
      state.message = message;
      state.type = type;
    },
    closeSneakbar: (state) => {
      state.open = false;
      state.type = "success";
      state.message = "";
    },
  },
});

export const { openSneakbar, closeSneakbar } = sneakbarSlice.actions;

export default sneakbarSlice.reducer;
