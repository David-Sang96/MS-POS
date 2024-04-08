import { Table } from "@prisma/client";
import { BaseOption } from "./menu";

export interface TableSlice {
  tables: Table[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateTablePayload extends Table, BaseOption {}
export interface UpdateTablePayload extends BaseOption {}
export interface DeleteTablePayload extends BaseOption {
  id: number;
}
