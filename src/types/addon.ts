import { Addon } from "@prisma/client";
import { BaseOption } from "./menu";

export interface AddonSlice {
  addons: Addon[];
  isLoading: boolean;
  isError: Error | null;
}

export interface UpdateAddonPayload extends Addon, BaseOption {}

export interface CreateAddonPayload extends BaseOption {
  name: string;
  price: number;
  addonCategoryId: number;
}

export interface DeleteAddonPayload extends BaseOption {
  id: number;
}
