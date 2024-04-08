import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySlice {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  isError: Error | null;
}
