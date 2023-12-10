import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useOutletContext } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { debug } from "vitest-preview";
import { ShopCart } from "../ShopCart";

// Mock child component CartProduct.jsx
vi.mock("../CartProduct.jsx", () => {
  return {
    CartProduct: ({ item = {}, handleIncrement, handleDecrement }) => {
      const { product = {}, quantity = 0 } = item;
      return (
        <div key={product.id}>
          <button
            onClick={() => {
              handleDecrement(product.id, quantity);
            }}
          >
            Decrease
          </button>

          <button
            onClick={() => {
              handleIncrement(product.id, quantity);
            }}
          >
            Increase
          </button>
        </div>
      );
    },
  };
});

// Mock useOutletContext
vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useOutletContext: vi.fn(),
  };
});

describe("ShopCart.jsx", () => {
  it("increases/decreases the product quantity successfully", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product 1",
      description: "test product 1 description",
      price: 12,
    };
    let totalItems = {
      1: { product, quantity: 2 },
    };

    const setTotalItems = vi.fn();
    useOutletContext.mockReturnValue([totalItems, setTotalItems]);
    // Render parent component
    render(
      <BrowserRouter>
        <ShopCart />
      </BrowserRouter>
    );

    const IncreaseBtn = screen.getByRole("button", { name: "Increase" });
    await user.click(IncreaseBtn);
    expect(setTotalItems).toHaveBeenCalledWith({ 1: { product, quantity: 3 } });

    const decBtn = screen.getByRole("button", { name: "Decrease" });
    await user.click(decBtn);
    expect(setTotalItems).toHaveBeenCalledWith({
      1: {
        product,
        quantity: 1,
      },
    });
  });

  it("does not increase quantity beyond 9", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product 1",
      description: "test product 1 description",
      price: 12,
    };
    let totalItems = {
      1: { product, quantity: 9 },
    };

    const setTotalItems = vi.fn();
    useOutletContext.mockReturnValue([totalItems, setTotalItems]);
    // Render parent component
    render(
      <BrowserRouter>
        <ShopCart />
      </BrowserRouter>
    );

    const IncreaseBtn = screen.getByRole("button", { name: "Increase" });
    await user.click(IncreaseBtn);
    expect(setTotalItems).toHaveBeenCalledWith({ 1: { product, quantity: 9 } });

    const decBtn = screen.getByRole("button", { name: "Decrease" });
    await user.click(decBtn);
    expect(setTotalItems).toHaveBeenCalledWith({
      1: {
        product,
        quantity: 8,
      },
    });
  });

  it("does not decrease quantity below 1", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product 1",
      description: "test product 1 description",
      price: 12,
    };
    let totalItems = {
      1: { product, quantity: 1 },
    };

    const setTotalItems = vi.fn();
    useOutletContext.mockReturnValue([totalItems, setTotalItems]);
    // Render parent component
    render(
      <BrowserRouter>
        <ShopCart />
      </BrowserRouter>
    );

    const IncreaseBtn = screen.getByRole("button", { name: "Increase" });
    await user.click(IncreaseBtn);
    expect(setTotalItems).toHaveBeenCalledWith({ 1: { product, quantity: 2 } });

    const decBtn = screen.getByRole("button", { name: "Decrease" });
    await user.click(decBtn);
    expect(setTotalItems).toHaveBeenCalledWith({
      1: {
        product,
        quantity: 1,
      },
    });
  });
  it("shoes empty cart message when no item is added", async () => {
    const product = {
      id: 1,
      title: "test product 1",
      description: "test product 1 description",
      price: 12,
    };
    let totalItems = {
      1: { product, quantity: 0 },
    };

    const setTotalItems = vi.fn();
    useOutletContext.mockReturnValue([totalItems, setTotalItems]);
    // Render parent component
    render(
      <BrowserRouter>
        <ShopCart />
      </BrowserRouter>
    );
    debug();
    expect(screen.getByRole("heading")).toHaveTextContent(
      /your cart is empty!/i
    );
    expect(
      screen.getByText(/Shop something then come to checkout please/i)
    ).toBeInTheDocument();
  });
});
