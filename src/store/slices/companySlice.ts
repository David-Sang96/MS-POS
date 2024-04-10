import { config } from "@/config";
import { CompanySlice, UpdateCompanyPayload } from "@/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  isError: null,
};

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (payload: UpdateCompanyPayload, thunkApi) => {
    const { onSuccess, onError, ...updatedCompany } = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/company`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCompany),
      });
      const { company } = await response.json();
      onSuccess && onSuccess();
      thunkApi.dispatch(setCompany(company));
    } catch (error) {
      onError && onError();
      console.error(error);
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const selectCompany = (state: RootState) => state.company.company;
export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
