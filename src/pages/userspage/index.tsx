import React, { useState, useEffect } from "react";

// Define User type to ensure type consistency
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

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter and validate user data
        const validUsers = data.filter((user: any): user is User => {
          return (
            typeof user.id === "number" &&
            typeof user.name === "string" &&
            typeof user.email === "string"
          );
        });

        setUsers(validUsers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div
        data-testid="loading-state"
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="animate-pulse text-center text-xl">
          Loading users...
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        data-testid="error-state"
        className="min-h-screen flex items-center justify-center p-4"
      >
        <p className="text-red-500 text-center text-xl" role="alert">
          {error}
        </p>
      </div>
    );
  }

  // Empty State - Ensure this is always rendered when users is empty
  if (users.length === 0) {
    return (
      <div
        data-testid="empty-state"
        className="min-h-screen flex items-center justify-center p-4"
      >
        <p className="text-center text-xl" data-testid="empty-message">
          No users found.
        </p>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Users Directory</h1>
      <div
        data-testid="users-grid"
        className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {users.map((user) => (
          <div
            key={user.id}
            data-testid={`user-card-${user.id}`}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold mb-2 truncate">{user.name}</h2>
            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <span data-testid={`user-email-${user.id}`}>{user.email}</span>
              </p>
              {user.phone && (
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  <span data-testid={`user-phone-${user.id}`}>
                    {user.phone}
                  </span>
                </p>
              )}
              {user.company?.name && (
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  <span data-testid={`user-company-${user.id}`}>
                    {user.company.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
