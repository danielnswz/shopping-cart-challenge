import React, { ReactNode, useEffect, useState } from "react";
import {
  DiscountProgressConfig,
  ILineItem,
  ICart,
  IShoppingCart,
} from "./types";

interface Props {
  config: DiscountProgressConfig;
  children: ReactNode;
}

export const shoppingCartInitialValue: ICart = {
  subtotal: 0,
  total: 0,
  discountIndex: undefined,
  items: [],
};

export const ShoppingCartContext = React.createContext<IShoppingCart>({
  cart: shoppingCartInitialValue,
  addNewItem: () => {},
});

export const ShoppingCartContextProvider: React.FC<Props> = ({
  config,
  children,
}) => {
  const [cart, setCart] = useState<ICart>(shoppingCartInitialValue);

  /**
   * @name addNewItem
   * @param {ILineItem} item - Cart item to be added or modified
   * @param {number} qty - Cart item qty to be set
   * @description Adds a new item to the cart in case it's not already there
   * @description otherwise, it will either modify the item qty or delete it from the list
   * @memberof ShoppingCartContext
   */
  const addNewItem = (item: ILineItem, qty: number = 1) => {
    const index = cart.items.findIndex((el) => el.product === item.product);
    let items: ILineItem[];
    if (index === -1) {
      items = [...cart.items, { ...item, qty: qty }];
    } else {
      items = cart.items;
      if (qty) {
        items[index] = { ...items[index], qty };
      } else {
        items = items.filter((el) => {
          return el.product !== item.product;
        });
      }
    }

    setCart((prev) => {
      return { ...prev, items };
    });
  };

  /**
   * @name discountCalculationEffect
   * @param {string} cart.items - useEffect dependency (cart items)
   * @param {DiscountProgressConfig} config - useEffect dependency (discount progress configuration)
   * @description Whenever the cart items or the config are modified, it will recalculate
   * @description and update the total and subtotal applying the proper discount
   * @memberof ShoppingCartContextProvider
   */
  useEffect(() => {
    const subtotal = cart.items.reduce(
      (reducer, item) => reducer + item.price * (item.qty || 1),
      0
    );
    const discountApply = Object.entries(config)
      .reverse()
      .find(([limit, _]) => {
        return subtotal >= Number(limit);
      });
    const total = subtotal - (discountApply ? discountApply[1] : 0);
    setCart((prev) => {
      return { ...prev, discountIndex: discountApply?.[0], total, subtotal };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cart.items), config]);

  return (
    <ShoppingCartContext.Provider value={{ cart, addNewItem }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
