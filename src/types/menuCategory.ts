import { BaseOption } from "./menu";

export interface NewMenuCategory extends BaseOption {
  name: string;
  price: number;
}

export interface MenuCategory extends NewMenuCategory {
  id: number;
}

export interface MenuCategorySlice {
  menuCategory: MenuCategory[];
  isLoading: boolean;
  isError: Error | null;
}
