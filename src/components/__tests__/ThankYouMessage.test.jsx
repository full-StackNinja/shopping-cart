import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import { ThankYouMessage } from "../ThankYouMessage";
import userEvent from "@testing-library/user-event";

describe("ThankYouMessage.jsx", () => {
  it("should render correct headings and text", () => {
    render(
      <BrowserRouter>
        <ThankYouMessage />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /order placed successfully/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /thank you for shopping with us./i })
    ).toBeInTheDocument();
  });
  it("shop more button should take to correct url when clicked", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ThankYouMessage />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", { name: /shop more/i });
    await user.click(button);
    expect(window.location.pathname).toEqual("/products");
  });
});
