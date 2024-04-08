import { Addon } from "@prisma/client";
import { BaseOption } from "./menu";

export interface AddonSlice {
  addons: Addon[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateAddonPayload extends Addon, BaseOption {}

export interface DeleteAddonPayload extends BaseOption {
  id: number;
}
