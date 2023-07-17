import { useSelector } from "react-redux";
import UserRow from "./UserRow";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const trClassName = "odd:bg-gray-900 even:bg-gray-800 ";
  const tdClassName = "px-6 py-3";

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <table className="table-auto w-full text-left border border-gray-800 rounded-l">
        <thead className="uppercase text-xs bg-gray-700">
          <tr>
            <th className={tdClassName}>User name</th>
            <th className={tdClassName}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <UserRow
                key={user.id}
                user={user}
                trClassName={trClassName}
                tdClassName={tdClassName}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
