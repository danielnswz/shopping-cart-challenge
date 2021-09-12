import React, { useContext } from "react";
import { ShoppingCartContext } from "../../ShoppingCartContext";
import { ILineItem } from "../../types";
import "./CartItem.scss";
import { DeleteStroke } from "./DeleteStroke";

interface Props {
  item: ILineItem;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { addNewItem } = useContext(ShoppingCartContext);

  return (
    <div className="cart-item__container">
      <img
        alt={item.product}
        src={`https://picsum.photos/100`}
        height="100px"
        width="100px"
      />
      <div className="cart-item__container__details">
        <h4>{item.product}</h4>
        <small>{item.productType}</small>
        <div className="cart-item__qty-section">
          <div className="cart-item__qty-section__buttons">
            <small>Qty: </small>
            <button onClick={() => addNewItem(item, (item.qty || 1) - 1)}>
              -
            </button>
            <input
              data-testid="qtyInput"
              type="number"
              value={item.qty}
              onChange={(e) => {
                e.target.value && addNewItem(item, Number(e.target.value));
              }}
            />
            <button onClick={() => addNewItem(item, (item.qty || 1) + 1)}>
              +
            </button>
          </div>
          <div className="cart-item__qty-section__price">
            <span>${(item.price * (item.qty || 1)).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <DeleteStroke onClick={() => addNewItem(item, 0)} />
    </div>
  );
};
