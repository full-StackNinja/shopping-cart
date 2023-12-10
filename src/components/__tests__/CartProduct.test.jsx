import { BrowserRouter } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import { CartProduct } from "../CartProduct";
import { render, screen } from "@testing-library/react";
import { debug } from "vitest-preview";
import userEvent from "@testing-library/user-event";

describe("CartProduct.jsx", () => {
  it("renders component correctly", () => {
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    const quantity = 2;
    const mockItem = {
      product,
      quantity,
    };

    render(
      <BrowserRouter>
        <CartProduct item={mockItem} />
      </BrowserRouter>
    );
    debug();
    expect(screen.getByRole("heading", { name: "test product" }));
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByText("12$/unit")).toBeInTheDocument();
  });

  it("calls the handleIncrement/handleDecrement function correctly", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    const quantity = 2;
    const mockItem = {
      product,
      quantity,
    };

    const mockHandleDecrement = vi.fn();
    const mockHandleIncrement = vi.fn();
    render(
      <BrowserRouter>
        <CartProduct
          item={mockItem}
          handleDecrement={mockHandleDecrement}
          handleIncrement={mockHandleIncrement}
        />
      </BrowserRouter>
    );

    const plusBtn = screen.getByRole("button", { name: "+" });
    for (let i = 0; i < 5; i++) {
      await user.click(plusBtn);
    }
    expect(mockHandleIncrement).toHaveBeenCalledTimes(5);

    const minusBtn = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 5; i++) {
      await user.click(minusBtn);
    }
    expect(mockHandleDecrement).toHaveBeenCalledTimes(5);
  });
});
