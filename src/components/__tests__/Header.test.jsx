import { Header } from "../Header/Header";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { expect, it, describe } from "vitest";

describe("Header.jsx", () => {
  it("renders correct path for nav links", async () => {
    const mocktotalItems = {};
    // simulate user
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Header totalItems={mocktotalItems} />
      </BrowserRouter>
    );

    const Products = screen.getByRole("link", { name: /products/i });

    await user.click(Products);
    expect(window.location.pathname).toBe("/products");

    const Home = screen.getByRole("link", { name: /home/i });

    await user.click(Home);
    expect(window.location.pathname).toBe("/home");

    const Cart = screen.getByRole("link", { name: /shop cart/i });
    await user.click(Cart);
    expect(window.location.pathname).toBe("/shop-cart");
  });

  it("should not find cart item count when cart is empty", () => {
    const mockTotalItems = {};
    render(
      <BrowserRouter>
        <Header totalItems={mockTotalItems} />
      </BrowserRouter>
    );
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("should show items count 1 on top of shop cart", () => {
    const mockTotalItems = {
      1: {
        id: 1,
        title: "test product1",
      },
    };
    render(
      <BrowserRouter>
        <Header totalItems={mockTotalItems} />
      </BrowserRouter>
    );
    expect(screen.queryByText("1")).toBeInTheDocument();
  });

  it("should show cart items 2 on top of the shop cart", () => {
    const mockTotalItems = {
      1: {
        id: 1,
        title: "test product1",
      },
      2: {
        id: 2,
        title: "test product2",
      },
    };

    render(
      <BrowserRouter>
        <Header totalItems={mockTotalItems} />
      </BrowserRouter>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
