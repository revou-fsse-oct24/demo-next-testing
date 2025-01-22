// __tests__/Profile.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Profile from "../../src/pages/Profile";

describe("Profile Component", () => {
  // Test 1: Check if heading exists
  test("renders the profile heading", () => {
    // Masukan component yang mau ditesting
    render(<Profile />);
    // Masukan nilai expectasinya
    const heading = screen.getByText("User Profile");
    // Memastikan nilai expecteasi dengan matchers
    expect(heading).toBeInTheDocument();
    // Kalau ada artinya dia lolos
  });

  // Test 2: Check specific text content
  it("displays the user name", () => {
    render(<Profile />);
    const name = screen.getByText("John Doe");
    expect(name).toBeInTheDocument();
  });

  // Test 3: Check if multiple elements exist
  it("shows all list items", () => {
    render(<Profile />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  // Test 4: Check for specific class names
  it("contains profile class name", () => {
    const { container } = render(<Profile />);
    const profileDiv = container.querySelector(".profile");
    expect(profileDiv).toBeInTheDocument();
  });

  // Test 5: Check text content within specific elements
  it("displays correct job title", () => {
    render(<Profile />);
    const title = screen.getByText("Software Developer");
    expect(title).toHaveClass("title");
  });
});
