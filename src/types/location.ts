import { Location } from "@prisma/client";
import { BaseOption } from "./menu";

export interface LocationSlice {
  locations: Location[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateLocationPayload extends BaseOption {
  name: string;
  street: string;
  city: string;
  township: string;
  companyId: number | undefined;
}

export interface UpdateLocationPayload extends Location, BaseOption {}

export interface DeleteLocationPayload extends BaseOption {
  id: number;
}
