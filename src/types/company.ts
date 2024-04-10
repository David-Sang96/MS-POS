import { Company } from "@prisma/client";
import { BaseOption } from "./menu";

export interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  isError: Error | null;
}

export interface UpdateCompanyPayload extends Company, BaseOption {}
