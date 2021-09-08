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
  // This is the current configuration but could change at any point.
  // the key is the total and the value is the discount apply
  const config: DiscountProgressConfig = useMemo(() => {
    return {
      135: 15,
      150: 20,
      200: 30,
      300: 50,
      /* 500: 100,
         800: 200,
         1500: 300, */
    };
  }, []);

  return (
    <>
      <ShoppingCartContextProvider config={config}>
        <div className="progress-kit">
          <CartHeader title="BUILD YOUR KIT & SAVE" config={config} />
          <DiscountProgressBar config={config} />
          <CartItemList />
          <CartSummary />
        </div>
        <CartExtra />
      </ShoppingCartContextProvider>
    </>
  );
};
