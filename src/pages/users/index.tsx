import { GetServerSideProps } from "next";
import { User } from "../../types/types";

interface UsersPageProps {
  users: User[];
}

export const getServerSideProps: GetServerSideProps<
  UsersPageProps
> = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await res.json();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
      },
    };
  }
};

const UsersPage = ({ users }: UsersPageProps) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-3 rounded">
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              {user.role && <p className="text-gray-500">Role: {user.role}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
