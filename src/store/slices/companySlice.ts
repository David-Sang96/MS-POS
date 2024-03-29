import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  isError: Error | null;
}

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  isError: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
