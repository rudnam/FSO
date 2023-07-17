import { Link } from "react-router-dom";

const Menu = ({ user }) => {
  const ulStyle = {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    gap: "10px",
  };

  return (
    <nav className="border-b border-gray-700 bg-gray-900 w-full sticky top-0">
      <div className="flex">
        <ul className="flex text-white">
          <li className="p-4 ">
            <Link to="/" className="hover:underline">
              Blogs
            </Link>
          </li>
          <li className="p-4">
            <Link to="/users" className="hover:underline">
              Users
            </Link>
          </li>
        </ul>
        <div className="p-4 ml-auto">{user.name} logged in.</div>

        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            window.location.reload();
          }}
          className="p-4 text-white hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Menu;
