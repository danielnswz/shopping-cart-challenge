import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import "./CartSummary.scss";

export const CartSummary: React.FC = () => {
  const {
    cart: { total, subtotal },
  } = useContext(ShoppingCartContext);

  return (
    <div className="cart-summary-container">
      <hr />
      <div className="cart-summary-container__total">
        <span>Build Your Kit Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="cart-summary-container__total">
        <span>Discount:</span>
        <span>
          $
          {subtotal - total > 0
            ? (subtotal - total).toFixed(2)
            : (0).toFixed(2)}
        </span>
      </div>
      <div className="cart-summary-container__total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
