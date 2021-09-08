import React, { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { DiscountProgressConfig } from "../types";

interface Props {
  title: string;
  config: DiscountProgressConfig;
}
export const CartHeader: React.FC<Props> = ({ title, config }) => {
  const {
    cart: { discountIndex },
  } = useContext(ShoppingCartContext);

  const [tier, setTier] = useState({
    tierAmount: Object.entries(config)[0][0],
    tierSaving: Object.entries(config)[0][1],
  });

  useEffect(() => {
    const configIndex = Object.keys(config).findIndex(
      (el) => el === discountIndex
    );
    if (configIndex !== -1 && configIndex < Object.keys(config).length - 1) {
      setTier({
        tierAmount: Object.entries(config)[configIndex + 1][0],
        tierSaving: Object.entries(config)[configIndex + 1][1],
      });
    }
    if (!discountIndex) {
      setTier({
        tierAmount: Object.entries(config)[0][0],
        tierSaving: Object.entries(config)[0][1],
      });
    }
  }, [config, discountIndex]);

  return (
    <>
      <h1>{title}</h1>
      <p>
        Spend ${tier.tierAmount}, Save ${tier.tierSaving}
      </p>
    </>
  );
};
