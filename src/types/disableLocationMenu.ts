import { DisabledLocationMenu } from "@prisma/client";

export interface DisableLocationMenuSlice {
  disableLocationMenus: DisabledLocationMenu[];
  isLoading: boolean;
  isError: Error | null;
}
