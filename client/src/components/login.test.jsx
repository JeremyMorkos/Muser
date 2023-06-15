import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import LoginForm from "./LoginForm";

beforeEach(() => {
  fetch.resetMocks();
});

const mockLogin = [
  {
    id: 1,
    email: "jeremy@gmail.com",
    password: "11111111",
  },
];

it("should check if password has at least 8 characters", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument("minLength");
});

it("should check if email has @ in text", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument("@");
});

it("should login the user on submit", async () => {
  const mockLogin = [
    {
      id: 1,
      email: "jeremy@gmail.com",
      password: "11111111",
    },
  ];

  fetch.mockResponse(JSON.stringify(mockLogin));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId("email-input"), {
    target: { value: "jeremy@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "11111111" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() =>
    expect(screen.getByDisplayValue("jeremy@gmail.com")).toBeInTheDocument()
  );
});

