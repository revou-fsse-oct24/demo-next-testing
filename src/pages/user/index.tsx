import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-4">
      <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </main>
  );
};

export default Home;
