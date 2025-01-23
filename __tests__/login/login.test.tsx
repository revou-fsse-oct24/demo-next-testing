import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "../../src/pages/login";

describe("LoginForm", () => {
  // =========================================
  // BASIC TESTS (From Previous Material)
  // =========================================

  describe("Basic Rendering (Previous Tests)", () => {
    // Test 1: Basic render test from yesterday
    test("renders login form with all elements", () => {
      render(<LoginForm onSubmit={async () => {}} />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /submit/i })
      ).toBeInTheDocument();
    });

    // Test 2: Basic form submission test from yesterday
    test("handles form submission with user input (using fireEvent)", () => {
      const mockSubmit = jest.fn().mockResolvedValue(undefined);
      render(<LoginForm onSubmit={mockSubmit} />);

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByTestId("submit-button"));

      expect(mockSubmit).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  // =========================================
  // NEW ENHANCED TESTS
  // =========================================

  describe("Enhanced Rendering Tests", () => {
    test("renders with initial email if provided", () => {
      render(
        <LoginForm onSubmit={async () => {}} initialEmail="test@example.com" />
      );
      expect(screen.getByTestId("email-input")).toHaveValue("test@example.com");
    });
  });

  describe("Form Validation (New Tests)", () => {
    test("shows validation errors for empty fields", async () => {
      render(<LoginForm onSubmit={async () => {}} />);

      // Submit the form
      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);

      // Validation should happen immediately after submit
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Email is required"
      );
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toHaveTextContent(
        "Password is required"
      );
    });

    test("shows error for invalid email format", async () => {
      render(<LoginForm onSubmit={async () => {}} />);

      // Enter invalid email
      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "invalid-email" },
      });

      // Submit form
      fireEvent.click(screen.getByTestId("submit-button"));

      // Error should appear immediately
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Email is invalid"
      );
    });

    test("shows error for short password", async () => {
      render(<LoginForm onSubmit={async () => {}} />);

      // Enter short password
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "12345" },
      });

      // Submit form
      fireEvent.click(screen.getByTestId("submit-button"));

      // Error should appear immediately
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toHaveTextContent(
        "Password must be at least 6 characters"
      );
    });
  });

  describe("Async Behavior (New Tests)", () => {
    test("shows loading state during submission", async () => {
      const mockSubmit = jest
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 1))
        );

      render(<LoginForm onSubmit={mockSubmit} />);

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByTestId("submit-button"));

      expect(screen.getByTestId("submit-button")).toHaveTextContent(
        "Logging in..."
      );
      expect(screen.getByTestId("submit-button")).toBeDisabled();

      await waitFor(() => {
        expect(screen.getByTestId("submit-button")).toHaveTextContent("Submit");
      });
    });

    test("handles submission error", async () => {
      const mockSubmit = jest.fn().mockRejectedValue(new Error("Login failed"));

      render(<LoginForm onSubmit={mockSubmit} />);

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByTestId("submit-button"));

      expect(await screen.findByTestId("general-error")).toHaveTextContent(
        "Login failed. Please try again."
      );
    });
  });

  describe("Modern Interaction Testing (New)", () => {
    test("handles form submission using userEvent", async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      render(<LoginForm onSubmit={mockSubmit} />);

      await user.type(screen.getByTestId("email-input"), "test@example.com");
      await user.type(screen.getByTestId("password-input"), "password123");
      await user.click(screen.getByTestId("submit-button"));

      expect(mockSubmit).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  describe("Disabled States (New Tests)", () => {
    test("disables form inputs during submission", async () => {
      // sebelum mulai buat mock dengan tujuan menahan asynchronous sebentar setelah button submit di klik
      const mockSubmit = jest
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100))
        );
      render(<LoginForm onSubmit={mockSubmit} />);

      // masukan si event, bisa pake fireevent / userevent

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "test123@mail.com" },
      });
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "nagaterbang123" },
      });

      fireEvent.click(screen.getByTestId("submit-button"));

      expect(screen.getByTestId("email-input")).toBeDisabled();
      expect(screen.getByTestId("password-input")).toBeDisabled();
      expect(screen.getByTestId("submit-button")).toBeDisabled();

      await waitFor(() => {
        expect(screen.getByTestId("email-input")).not.toBeDisabled();
        expect(screen.getByTestId("password-input")).not.toBeDisabled();
        expect(screen.getByTestId("submit-button")).not.toBeDisabled();
      });
    });
  });
});
