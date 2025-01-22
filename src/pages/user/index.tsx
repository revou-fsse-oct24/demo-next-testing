import { User } from "../../types/types";
import { useEffect, useState } from "react";

import Head from "next/head";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch user");
        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>

          {loading && <div>Loading...</div>}

          {error && <div className="text-red-500">Error: {error}</div>}

          {user && !loading && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
