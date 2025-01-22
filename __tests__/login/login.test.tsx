// __tests__/LoginForm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "../../src/pages/login";

describe("LoginForm", () => {
  // Test 1: Component renders correctly
  test("renders login form with all elements", () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  // Test 2: Form submission with user input
  test("handles form submission with user input", () => {
    // Create a mock function to test form submission
    const mockSubmit = jest.fn(() => {});
    render(<LoginForm onSubmit={mockSubmit} />);

    // Get form elements
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    // Simulate user typing
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if onSubmit was called with correct values
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("handles form submission with user input", async () => {
    // Create userEvent instance
    const user = userEvent.setup();

    // Create a mock function to test form submission
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    // Get form elements
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    // Type into inputs using userEvent
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    // Click submit button using userEvent
    await user.click(submitButton);

    // Check if onSubmit was called with correct values
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "password123");
  });

  // Test 3: Input validation
  test("requires email and password fields", () => {
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});
