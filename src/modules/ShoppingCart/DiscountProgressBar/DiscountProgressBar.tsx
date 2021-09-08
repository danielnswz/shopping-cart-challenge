import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import "./DiscountProgressBar.scss";
import { DiscountProgress, DiscountProgressConfig } from "../types";

interface Props {
  config: DiscountProgressConfig;
}

export const DiscountProgressBar: React.FunctionComponent<Props> = ({
  config,
}) => {
  const [fullConfig, setFullConfig] = useState<DiscountProgress | undefined>();

  const {
    cart: { subtotal },
  } = useContext(ShoppingCartContext);

  useEffect(() => {
    const fC = Object.keys(config).reduce(
      (ac: any, cv: string, ci: number, vector: string[]) => {
        const progress = subtotal / Number(cv) > 1 ? 1 : subtotal / Number(cv);
        const progressPos = (index: number) => ac[vector[index]]?.progress;
        const obj = {
          amount: config[Number(cv)],
          progress: progressPos(ci - 1) < 1 ? 0 : progress,
          isReached:
            (ci < vector.length - 1 &&
              progressPos(ci) === 1 &&
              progressPos(ci + 1) < 1) ||
            (ci === vector.length - 1 && progressPos(ci) === 1),
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

  return (
    <div className="progress-bar">
      <div className="progress-bar__container">
        {!!fullConfig &&
          Object.keys(fullConfig).map(
            (el: any, index: number, array: string[]) => {
              return (
                <div
                  key={el}
                  className="progress-bar__bg"
                  style={{ zIndex: array.length - index }}
                >
                  <div
                    className="progress-bar__bg--progress"
                    style={{
                      width: `${fullConfig[el].progress * 100}%`,
                    }}
                  />
                  <div
                    className={`progress-bar__text-off${
                      (index < array.length - 1 &&
                        fullConfig[array[index] as any].progress === 1 &&
                        fullConfig[array[index + 1] as any].progress < 1) ||
                      (index === array.length - 1 &&
                        fullConfig[array[index] as any].progress === 1)
                        ? " progress-bar__text-off--reached"
                        : ""
                    }`}
                  >
                    ${fullConfig[el].amount} OFF
                    {fullConfig[el].isReached}
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};
