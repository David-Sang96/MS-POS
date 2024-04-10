import { config } from "@/config";
import {
  CreateTablePayload,
  DeleteTablePayload,
  TableSlice,
  UpdateTablePayload,
} from "@/types/table";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TableSlice = {
  tables: [],
  isLoading: false,
  isError: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload: CreateTablePayload, thunkApi) => {
    const { onSuccess, onError, ...newTable } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      });
      const { table } = await response.json();
      console.log(table);
      onSuccess && onSuccess();
      thunkApi.dispatch(addTable(table));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (payload: UpdateTablePayload, thunkApi) => {
    const { onSuccess, onError, ...updateTable } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTable),
      });
      const { table } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(replaceTable(table));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (payload: DeleteTablePayload, thunkApi) => {
    const { onSuccess, onError, id } = payload;
    try {
      await fetch(`${config.backofficeApiBaseUrl}/table?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onSuccess && onSuccess();
      thunkApi.dispatch(removeTable(id));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setTables, addTable, replaceTable, removeTable } =
  tableSlice.actions;
export default tableSlice.reducer;
