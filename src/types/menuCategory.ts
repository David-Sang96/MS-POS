import { MenuCategory } from "@prisma/client";
import { BaseOption } from "./menu";

export interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateMenuCategoryPayload extends BaseOption {
  name: string;
  companyId: number | undefined;
}

export interface UpdateMenuCategoryPayload extends MenuCategory, BaseOption {
  // id: number;
  // name: string;
  isAvailable: boolean;
  locationId?: number;
}

export interface DeleteMenuCategoryPayload extends BaseOption {
  id: number;
}
