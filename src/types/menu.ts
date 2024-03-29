import { Menu } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  isError: Error | null;
}

export interface CreateMenuPayload extends BaseOption {
  name: string;
  price: number;
}
