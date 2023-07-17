import { Link } from "react-router-dom";

const Menu = ({ user }) => {
  const navStyle = {
    backgroundColor: "#d3d3d3",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px",
  };
  const ulStyle = {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    gap: "10px",
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <div>{user.name} logged in</div>

      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem("loggedBlogappUser");
          window.location.reload();
        }}
      >
        logout
      </button>
    </nav>
  );
};

export default Menu;
