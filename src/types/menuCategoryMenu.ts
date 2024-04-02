import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenusSlice {
  menuCategoryMenus: MenuCategoryMenu[];
  isLoading: boolean;
  isError: Error | null;
}
