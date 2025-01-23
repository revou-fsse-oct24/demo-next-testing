import { render, screen, waitFor } from "@testing-library/react";
import UsersPage from "../../src/pages/userspage";
import { rest } from "msw";
import { setupServer } from "msw/node";

// Ensure the User type matches your actual type definition
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: {
    name: string;
    catchPhrase?: string;
  };
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
    },
  },
];

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) =>
    res(ctx.json(mockUsers))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UsersPage", () => {
  // Test 1: Initial Loading State
  it("shows loading state initially", () => {
    render(<UsersPage />);
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  // Test 2: Successful Data Fetch
  it("displays user data after successful fetch", async () => {
    render(<UsersPage />);

    // First check loading state
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    // Wait for the user data to be displayed
    await waitFor(() => {
      expect(screen.queryByTestId("loading-state")).not.toBeInTheDocument();
    });

    // Check if user data is displayed correctly
    const userCard = screen.getByTestId("user-card-1");
    expect(userCard).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByTestId("user-email-1")).toHaveTextContent(
      "Sincere@april.biz"
    );
    expect(screen.getByTestId("user-phone-1")).toHaveTextContent(
      "1-770-736-8031 x56442"
    );
    expect(screen.getByTestId("user-company-1")).toHaveTextContent(
      "Romaguera-Crona"
    );
  });
});

export {};
