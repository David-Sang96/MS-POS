import { DisabledLocationMenuCategory } from "@prisma/client";

export interface DisableLocationMenuCategorySlice {
  disableLocationMenuCategories: DisabledLocationMenuCategory[];
  isLoading: boolean;
  isError: Error | null;
}
