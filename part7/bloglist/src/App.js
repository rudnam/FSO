import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";

function App() {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <Error />
          {user.name} logged in
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              window.location.reload();
            }}
          >
            logout
          </button>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          {blogs && blogs.length > 0
            ? [...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
            : null}
        </div>
      )}
    </div>
  );
}

export default App;
