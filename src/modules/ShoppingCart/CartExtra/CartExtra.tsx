import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { bras1, bras2, panties } from "../items";
import { ILineItem } from "../types";
import "./CartExtra.scss";

export const CartExtra = () => {
  const {
    addNewItem,
    cart: { items },
  } = useContext(ShoppingCartContext);
  const isItemInCart = (item: ILineItem): boolean => {
    return !!items.find((el) => el.product === item.product);
  };
  return (
    <div className="cart-extra-container">
      <button onClick={() => addNewItem(bras1)} disabled={isItemInCart(bras1)}>
        Add Bras 1
      </button>
      <button onClick={() => addNewItem(bras2)} disabled={isItemInCart(bras2)}>
        Add Bras 2
      </button>
      <button
        onClick={() => addNewItem(panties)}
        disabled={isItemInCart(panties)}
      >
        Add Underwear
      </button>
    </div>
  );
};
