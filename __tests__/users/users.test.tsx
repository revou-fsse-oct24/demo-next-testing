import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersPage from "../../src/pages/users";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { User } from "../../src/types/types";

// Mock data setup
// We create sample user data that matches our User interface
const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Admin" },
];

// Setup MSW (Mock Service Worker)
// This creates a mock server to intercept API calls during testing
const server = setupServer(
  // Define how the server should respond to GET requests
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  })
);

// Test lifecycle hooks
beforeAll(() => server.listen()); // Start mock server before all tests
afterEach(() => {
  server.resetHandlers(); // Reset mock server handlers after each test
  jest.clearAllMocks(); // Clear all mocks after each test
});
afterAll(() => server.close()); // Close mock server after all tests

describe("UsersPage", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders the page title correctly", () => {
      render(<UsersPage users={mockUsers} />);

      // Check if the main heading exists
      const heading = screen.getByRole("heading", { name: /users/i });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-2xl"); // Check styling
    });

    it("renders all user cards with correct information", () => {
      render(<UsersPage users={mockUsers} />);

      // Get all list items
      const userItems = screen.getAllByRole("listitem");
      expect(userItems).toHaveLength(mockUsers.length);

      // Check each user's information safely
      mockUsers.forEach((user) => {
        // Type guard to ensure we have required fields
        if (user.name && user.email) {
          const userCard = screen.getByText(user.name);
          expect(userCard).toBeInTheDocument();

          const emailElement = screen.getByText(user.email);
          expect(emailElement).toBeInTheDocument();
        }
      });
    });
  });

  // Empty state tests
  describe("Empty State Handling", () => {
    it("renders no users message when users array is empty", () => {
      render(<UsersPage users={[]} />);

      // Check for empty state message
      expect(screen.getByText("No users found.")).toBeInTheDocument();

      // Verify that no user cards are rendered
      const userItems = screen.queryAllByRole("listitem");
      expect(userItems).toHaveLength(0);
    });
  });

  // Role-specific tests
  describe("User Role Display", () => {
    it("renders role when provided", () => {
      const usersWithRole: User[] = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      ];

      render(<UsersPage users={usersWithRole} />);

      // Check if role is displayed
      expect(screen.getByText("Role: Admin")).toBeInTheDocument();
    });

    it("doesn't render role section when role is not provided", () => {
      const usersWithoutRole: User[] = [
        { id: 1, name: "John Doe", email: "john@example.com" },
      ];

      render(<UsersPage users={usersWithoutRole} />);

      // Check that no role text is present
      expect(screen.queryByText(/Role:/)).not.toBeInTheDocument();
    });
  });

  // Styling tests
  describe("Styling and Layout", () => {
    it("applies correct styling to user cards", () => {
      render(<UsersPage users={mockUsers} />);

      // Check if user cards have the correct styling classes
      const userCards = screen.getAllByRole("listitem");
      userCards.forEach((card) => {
        expect(card).toHaveClass("border", "p-3", "rounded");
      });
    });

    it("applies correct spacing between user cards", () => {
      render(<UsersPage users={mockUsers} />);

      // Check if the container has the correct spacing class
      const userList = screen.getByRole("list");
      expect(userList).toHaveClass("space-y-2");
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("uses semantic HTML elements", () => {
      render(<UsersPage users={mockUsers} />);

      // Check for semantic heading
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      // Check for semantic list
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("renders user names as headings for better structure", () => {
      render(<UsersPage users={mockUsers} />);

      // Check if user names are rendered as headings
      mockUsers.forEach((user) => {
        const nameHeading = screen.getByRole("heading", { name: user.name });
        expect(nameHeading).toHaveClass("font-semibold");
      });
    });
  });
});
