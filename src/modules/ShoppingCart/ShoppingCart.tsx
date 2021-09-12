import React, { useMemo } from "react";
import { CartSummary } from "./CartSummary";
import { DiscountProgressBar } from "./DiscountProgressBar";
import "./ShoppingCart.scss";
import { ShoppingCartContextProvider } from "./ShoppingCartContext";
import { DiscountProgressConfig } from "./types";
import { CartHeader } from "./CartHeader";
import { CartExtra } from "./CartExtra";
import { CartItemList } from "./CartItemList";

export const ShoppingCart: React.FC = () => {
  const config: DiscountProgressConfig = useMemo(() => {
    return {
      135: 15,
      150: 20,
      200: 30,
      300: 50,
    };
  }, []);

  return (
    <div className="progress-kit__container">
      <ShoppingCartContextProvider config={config}>
        <div className="progress-kit">
          <CartHeader title="BUILD YOUR KIT & SAVE" config={config} />
          <DiscountProgressBar config={config} />
          <CartItemList />
          <CartSummary />
        </div>
        <CartExtra />
      </ShoppingCartContextProvider>
    </div>
  );
};
