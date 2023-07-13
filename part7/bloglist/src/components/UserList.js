import { useSelector } from "react-redux";
import UserRow from "./UserRow";

const UserList = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
