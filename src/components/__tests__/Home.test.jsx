import { describe, expect, it } from "vitest";
import { Home } from "../Home";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Home.jsx", () => {
  it("should render component correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /howdi waodi/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/a name to be trusted/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /shop from the variety of the items!/i,
      })
    ).toBeInTheDocument();
  });
});
