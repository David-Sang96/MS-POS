import { MenuCategory } from "@prisma/client";
import { BaseOption } from "./menu";

export interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateMenuCategoryPayload extends BaseOption {
  name: string;
  isAvailable: boolean;
  companyId: number | undefined;
}

export interface UpdateMenuCategoryPayload extends CreateMenuCategoryPayload {
  id: number;
}
