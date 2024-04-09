import { AddonCategory } from "@prisma/client";
import { BaseOption } from "./menu";

export interface AddonCategorySlice {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateAddonCategoryPayload extends BaseOption {
  name: string;
  isRequired: boolean;
  menuIds: number[];
}

export interface UpdateAddonCategoryPayload extends AddonCategory, BaseOption {
  menuIds: number[];
  locationId?: number;
}

export interface DeleteAddonCategoryPayload extends BaseOption {
  id: number;
}
