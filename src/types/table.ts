import { Table } from "@prisma/client";
import { BaseOption } from "./menu";

export interface TableSlice {
  tables: Table[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateTablePayload extends BaseOption {
  name: string;
  locationId?: number;
  assetUrl: string;
}
export interface UpdateTablePayload extends Table, BaseOption {}
export interface DeleteTablePayload extends BaseOption {
  id: number;
}
