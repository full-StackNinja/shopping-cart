import { render, screen } from "@testing-library/react";
import { BrowserRouter, useRouteError } from "react-router-dom";
import { it, describe, expect, vi } from "vitest";
import { ErrorPage } from "../ErrorPage";
import { debug } from "vitest-preview";

// Mock userRouter error
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe("ErrorPage.jsx", () => {
  it("displays heading and error detail message", () => {
    useRouteError.mockReturnValue({
      message: "Not found",
    });
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    debug();
    expect(screen.getByRole("heading", { name: "Oops!" }));
    expect(
      screen.getByText("Sorry! an unexpected error has occurred.")
    ).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });
});
