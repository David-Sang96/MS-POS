import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TableSlice {}

const initialState: TableSlice = {};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}`);
      const {} = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
});

export const {} = tableSlice.actions;
export default tableSlice.reducer;
