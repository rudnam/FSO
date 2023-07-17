import { Link } from "react-router-dom";

const UserRow = ({ user, trClassName, tdClassName }) => (
  <tr className={trClassName}>
    <td className={tdClassName}>
      <Link to={`/users/${user.id}`} className="hover:underline">
        {user.name}
      </Link>
    </td>
    <td className={tdClassName}>{user.blogs.length}</td>
  </tr>
);
export default UserRow;
