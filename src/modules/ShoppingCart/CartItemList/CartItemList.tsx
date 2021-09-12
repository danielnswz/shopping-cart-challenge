import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { CartItem } from "./CartItem";
import "./CartItem.scss";

export const CartItemList: React.FC = () => {
  const {
    cart: { items },
  } = useContext(ShoppingCartContext);

  return (
    <div className="cart-items-container">
      {!items.length && <h2>Your cart is empty</h2>}
      {items.map((item) => {
        return (
          <React.Fragment key={item.product}>
            <hr />
            <CartItem key={item.product} item={item} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
