import React from "react";
import { DiscountProgressConfig } from "../types";
import { useProgressHooks } from "./DiscountProgressBar.hooks";
import "./DiscountProgressBar.scss";

interface Props {
  config: DiscountProgressConfig;
}

export const DiscountProgressBar: React.FC<Props> = ({ config }) => {
  const { fullConfig, indexReached } = useProgressHooks(config);

  return (
    <div className="progress-bar">
      <div className="progress-bar__container">
        {!!fullConfig &&
          Object.keys(fullConfig).map(
            (el: any, index: number, array: string[]) => {
              const isReached = indexReached === el;

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
                      isReached ? " progress-bar__text-off--reached" : ""
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
