import { render, screen } from "@testing-library/react";

jest.mock("axios", () => {
  const mockAxios = jest.fn(() => Promise.resolve({ status: 200, data: {} }));
  mockAxios.get = jest.fn(() => Promise.resolve({ data: [] }));
  mockAxios.post = jest.fn(() => Promise.resolve({ status: 200, data: {} }));
  mockAxios.put = jest.fn(() => Promise.resolve({}));
  mockAxios.delete = jest.fn(() => Promise.resolve({}));
  return { __esModule: true, default: mockAxios };
});

jest.mock("react-day-picker", () => ({
  DayPicker: () => null,
}));

import App from "./App";

test("renders site header", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /Teacher Digital Agency/i });
  expect(linkElement).toBeInTheDocument();
});
