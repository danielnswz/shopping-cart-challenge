import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { CartItem } from "./";
import {
  ShoppingCartContext,
  shoppingCartInitialValue,
} from "../../ShoppingCartContext";

describe("<CartItem />", () => {
  const item = {
    product: "product",
    productType: "productType",
    price: 10,
    qty: 1,
  };
  test("renders", () => {
    render(<CartItem item={item} />);
  });

  test("qty", () => {
    const component = render(<CartItem item={item} />);
    expect(component.getByText("product")).toBeDefined();
    expect(component.getByText("-")).toBeDefined();
    expect(component.getByText("+")).toBeDefined();
    expect(component.getByTestId("qtyInput")).toHaveValue(1);
    expect(component.getByText("$10.00")).toBeDefined();
  });

  test("qty callbacks", () => {
    const addNewItem = jest.fn();
    const component = render(
      <ShoppingCartContext.Provider
        value={{ cart: shoppingCartInitialValue, addNewItem }}
      >
        <CartItem item={item} />
      </ShoppingCartContext.Provider>
    );
    const minusBtn = component.getByText("-");
    const plusBtn = component.getByText("+");
    const input = component.getByTestId("qtyInput");

    fireEvent.click(plusBtn);
    expect(addNewItem).toHaveBeenCalledTimes(1);
    fireEvent.click(minusBtn);
    expect(addNewItem).toHaveBeenCalledTimes(2);
    fireEvent.change(input, { target: { value: 30 } });
    expect(addNewItem).toHaveBeenCalledTimes(3);
    expect(addNewItem).toHaveBeenLastCalledWith(item, 30);
  });
});
