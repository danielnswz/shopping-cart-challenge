import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { DiscountProgress, DiscountProgressConfig } from "../types";

/**
 * @name useProgressHooks
 * @param {DiscountProgressConfig} config - useEffect dependency (discount progress configuration)
 * @returns {Object} Progress hooks return object.
 * @returns {DiscountProgress} fullConfig - Discount progress full configuration
 * @returns {string} indexReached - Index within the fullConfig reached by it's progress
 * @description DiscountProgressBar custom hooks
 * @memberof DiscountProgressBar
 * @see updateFullConfigEffect
 * @see updateIndexReachedEffect
 */
export const useProgressHooks = (config: DiscountProgressConfig) => {
  const {
    cart: { subtotal },
  } = useContext(ShoppingCartContext);
  const [fullConfig, setFullConfig] = useState<DiscountProgress | undefined>();
  const [indexReached, setIndexReached] = useState<string | undefined>();

  /**
   * @name updateFullConfigEffect
   * @param {DiscountProgressConfig} config - useEffect dependency (discount progress configuration)
   * @param {number} subtotal - useEffect dependency (cart subtotal)
   * @description Updates fullConfig state every time config or subtotal changes to set it's progress
   * @example config comes as { 135: 50 } and subtotal as 200
   * @example updates fullConfig to be { 135: { amount: 50, progress: 1}}
   * @memberof DiscountProgressBar
   */
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

  /**
   * @name updateIndexReachedEffect
   * @param {DiscountProgress} fullConfig - useEffect dependency (discount progress full configuration)
   * @description Determines which index within the fullConfig is reached by it's progress
   * @example fullConfig comes as { 135: { amount: 50, progress: 1}}
   * @example updates indexReached to be "135"
   * @memberof DiscountProgressBar
   * @see updateFullConfigEffect
   */
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
