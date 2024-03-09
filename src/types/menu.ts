export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  isError: Error | null;
}

export interface NewMenu extends BaseOption {
  name: string;
  price: number;
}

export interface Menu extends NewMenu {
  id: number;
}
