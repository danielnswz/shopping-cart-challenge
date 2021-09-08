import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { CartItemList } from "./";
import {
  ShoppingCartContext,
  shoppingCartInitialValue,
} from "../ShoppingCartContext";

describe("<CartItem />", () => {
  const item = {
    product: "product",
    productType: "productType",
    price: 10,
    qty: 1,
  };
  test("renders", () => {
    render(<CartItemList />);
  });

  test("renders items", () => {
    const addNewItem = jest.fn();
    const cart = {
      ...shoppingCartInitialValue,
      items: [item, { ...item, product: "product2" }],
    };
    const component = render(
      <ShoppingCartContext.Provider value={{ cart, addNewItem }}>
        <CartItemList />
      </ShoppingCartContext.Provider>
    );
    component.getByText("product");
    component.getByText("product2");
  });
});
