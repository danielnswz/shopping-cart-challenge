import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { CartItem } from "./CartItem";
import "./CartItemList.scss";

export const CartItemList: React.FC = () => {
  const {
    cart: { items },
  } = useContext(ShoppingCartContext);

  return (
    <div className="cart-items-container">
      {!items.length && (
        <>
          <h2>Your cart is empty</h2>
          <hr />
        </>
      )}
      {items.map((item) => {
        return (
          <React.Fragment key={item.product}>
            <CartItem key={item.product} item={item} />
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};
