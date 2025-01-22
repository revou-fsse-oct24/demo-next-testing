import { render, screen } from "@testing-library/react";
import Home from "@/pages/user";

// Mock Next/head
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays loading state initially", () => {
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders user data on successful fetch", async () => {
    // Mock successful fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "John Doe",
        email: "john.doe@example.com",
      }),
    });

    render(<Home />);

    // Wait for user data to render
    const nameElement = await screen.findByText("Name: John Doe");
    const emailElement = await screen.findByText("Email: john.doe@example.com");

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });

  test("renders error message on failed fetch", async () => {
    // Mock failed fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<Home />);

    // Wait for error message to render
    const errorElement = await screen.findByText("Error: Network error");
    expect(errorElement).toBeInTheDocument();
  });
});
