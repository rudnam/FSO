import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setErrorMessage } from "./reducers/errorReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { initializeBlogs } from "./reducers/blogReducer";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage("wrong username or password", 3));
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
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
