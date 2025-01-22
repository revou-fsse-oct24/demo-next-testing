import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/pages/user";

describe("Home", () => {
  test("renders user data", async () => {
    render(<Home />);

    // Use findByText for async elements
    const loadingElement = await screen.findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();

    // Wait for user data
    const nameElement = await screen.findByText(/John Doe/i);
    expect(nameElement).toBeInTheDocument();

    // Check other elements
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Developer/)).toBeInTheDocument();
  });
});
