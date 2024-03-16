import { BaseOption } from "./menu";

export interface CreateMenuCategoryPayload extends BaseOption {
  name: string;
  isAvailable: boolean;
}

export interface MenuCategory extends CreateMenuCategoryPayload {
  id: number;
}

export interface MenuCategorySlice {
  menuCategory: MenuCategory[];
  isLoading: boolean;
  isError: Error | null;
}
