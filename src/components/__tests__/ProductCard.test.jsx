import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductCard from "../ProductCard";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: "12",
  image: "test-image.jpg",
};

const mockHandleAddToCart = vi.fn();

describe("ProductCard", () => {
  it("should render the component correctly", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <ProductCard product={mockProduct} handleAddToCart={mockHandleAddToCart} />,
      },
    ]);

    render(<RouterProvider router={router} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();

    const productName = screen.getByText("Test Product");
    expect(productName).toBeInTheDocument();

    const price = screen.getByText("12$");
    expect(price).toBeInTheDocument();
  });

  it("routes to correct link when product clicked", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} handleAddToCart={mockHandleAddToCart} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /test product/i });
    await user.click(link);

    expect(window.location.pathname).toBe("/product-detail-page/1");
  });

  it("should call the handleAddToCart function on button click", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} handleAddToCart={mockHandleAddToCart} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);
    await user.click(button);
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(2);
  });
});
