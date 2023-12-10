import { render, screen } from "@testing-library/react";
import { BrowserRouter, useLocation, useOutletContext } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ProductDetailPage } from "../ProductDetailPage";
import { debug } from "vitest-preview";
import userEvent from "@testing-library/user-event";

// Mock useLocation() and useOutletContext()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
    useOutletContext: vi.fn(),
  };
});

describe("ProductDetailPage.jsx", () => {
  it("renders component correctly", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    useLocation.mockReturnValue({ state: { product } });
    const totalItems = {};
    useOutletContext.mockReturnValue([totalItems, vi.fn()]);

    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    // debug();

    // Assertions
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("12$/unit")).toBeInTheDocument();
    const minusBtn = screen.getByRole("button", { name: "-" });
    expect(minusBtn).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("renders Add to Cart button enabled and Checkout button disabled when item is not added", () => {
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    useLocation.mockReturnValue({ state: { product } });
    const totalItems = {};
    useOutletContext.mockReturnValue([totalItems, vi.fn()]);

    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    const addToCart = screen.getByRole("button", { name: /add to cart/i });
    const checkout = screen.getByRole("button", { name: /checkout/i });

    expect(addToCart).toBeEnabled();
    expect(checkout).toBeDisabled();
  });

  it("renders checkout button enabled and Add to cart disabled when item is added to cart", () => {
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    useLocation.mockReturnValue({ state: { product } });
    const totalItems = {
      1: {
        product,
        quantity: 1,
      },
    };
    useOutletContext.mockReturnValue([totalItems, vi.fn()]);

    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );

    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    const addedToCartBtn = screen.getByRole("button", {
      name: /added to cart/i,
    });

    expect(checkoutBtn).toBeEnabled();
    expect(addedToCartBtn).toBeDisabled();
  });

  it('renders to "/shop-cart" url when checkout button is clicked', async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "test product",
      description: "test description",
      price: 12,
    };
    useLocation.mockReturnValue({ state: { product } });
    const totalItems = {
      1: {
        product,
        quantity: 1,
      },
    };
    useOutletContext.mockReturnValue([totalItems, vi.fn()]);

    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );

    const checkOut = screen.getByRole("button", { name: "Checkout" });
    await user.click(checkOut);
    expect(window.location.pathname).toBe("/shop-cart");
  });
});
