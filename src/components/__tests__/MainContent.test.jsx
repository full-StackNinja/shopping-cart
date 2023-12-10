import { BrowserRouter, json, useOutletContext } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import { debug } from "vitest-preview";
import { MainContent } from "../MainContent";
import { render, screen, waitFor } from "@testing-library/react";
import nodeFetch from "node-fetch";
import { act } from "react-dom/test-utils";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

describe("MainContent.jsx", () => {
  it("renders loading message when data is being fetched", () => {
    useOutletContext.mockReturnValue([{}, vi.fn()]);
    render(
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /loading data.../i })
    ).toBeInTheDocument();
  });

  it("renders products when data is fetched", async () => {
    const data = [
      { id: 1, title: "test product1", price: "12" },
      { id: 2, title: "test product2", price: "11" },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(data), ok: true })
    );

    useOutletContext.mockReturnValue([{}, vi.fn()]);
    await act(async () => {
      render(
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      );
    });

    const products = screen.getAllByTestId("product");
    expect(products).toHaveLength(2);
    expect(products[0]).toHaveTextContent("test product1");
    expect(products[1]).toHaveTextContent("test product2");
    expect(products[0]).toHaveTextContent("12$");
    expect(products[1]).toHaveTextContent("11$");
  });
  it("throws error when data fetching fails", async () => {
    const data = [
      { id: 1, title: "test product1", price: "12" },
      { id: 2, title: "test product2", price: "11" },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: false,
        status: 404,
      })
    );
    useOutletContext.mockReturnValue([{}, vi.fn()]);
    await act(async () => {
      render(
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      );
    });
    // debug();
    expect(screen.getByText(/An HTTP error occured with status code: 404/i));
  });
});
