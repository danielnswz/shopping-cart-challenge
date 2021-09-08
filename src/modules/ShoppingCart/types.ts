export interface ILineItem {
  product: string
  productType: string
  price: number
  qty?: number
}

export interface DiscountProgressConfig {
  [total: number]: number
}

export interface ProgressSection {
  amount: number
  progress: number
  isReached: boolean
}
export interface DiscountProgress {
  [total: number]: ProgressSection
}

export interface ICart {
  subtotal: number;
  total: number;
  items: ILineItem[];
  discountIndex: string | undefined;
}
export interface IShoppingCart {
  cart: ICart;
  addNewItem: (item: ILineItem, qty?: number) => void;
}