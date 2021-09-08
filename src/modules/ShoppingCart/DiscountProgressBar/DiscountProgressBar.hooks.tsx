import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { DiscountProgress, DiscountProgressConfig } from "../types";

export const useProgressHooks = (config: DiscountProgressConfig) => {
  const {
    cart: { subtotal },
  } = useContext(ShoppingCartContext);
  const [fullConfig, setFullConfig] = useState<DiscountProgress | undefined>();
  const [indexReached, setIndexReached] = useState<string | undefined>();

  useEffect(() => {
    const fC = Object.keys(config).reduce(
      (ac: any, cv: string, ci: number, vector: string[]) => {
        const progress = subtotal / Number(cv) > 1 ? 1 : subtotal / Number(cv);
        const progressPos = (index: number) => ac[vector[index]]?.progress;
        const obj = {
          amount: config[Number(cv)],
          progress: progressPos(ci - 1) < 1 ? 0 : progress,
        };
        return {
          ...ac,
          [cv]: obj,
        };
      },
      {}
    );
    setFullConfig(fC);
  }, [config, subtotal]);

  useEffect(() => {
    if (fullConfig) {
      setIndexReached(
        Object.keys(fullConfig).find(
          (_: any, index: number, array: string[]) => {
            return (
              (index < array.length - 1 &&
                fullConfig[array[index] as any].progress === 1 &&
                fullConfig[array[index + 1] as any].progress < 1) ||
              (index === array.length - 1 &&
                fullConfig[array[index] as any].progress === 1)
            );
          }
        )
      );
    }
  }, [fullConfig]);
  return { fullConfig, indexReached };
};
