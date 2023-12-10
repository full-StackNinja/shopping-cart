import { render, screen } from "@testing-library/react";
import { App } from "../App/App";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";

describe("App.jsx", () => {
  it("renders Header component correctly", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
      },
    ]);
    render(<RouterProvider router={router} />);

    const heading = screen.getByRole("heading", { name: /howdi waodi/i });

    expect(heading).toBeInTheDocument();

    const products = screen.getByRole("link", { name: /products/i });
    expect(products).toBeInTheDocument();

    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toBeInTheDocument();

    const shopCart = screen.getByAltText("shop cart");
    expect(shopCart).toBeInTheDocument();
  });
});
