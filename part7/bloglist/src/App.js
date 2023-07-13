import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList";
import User from "./components/User";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setCurrentUser } from "./reducers/currentUserReducer";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  useEffect(() => {
    if (match && users.length > 0) {
      const user = users.find((user) => user.id === match.params.id);
      setFoundUser(user);
    }
  }, [match, users]);

  return (
    <div>
      {currentUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <Error />
          {currentUser.name} logged in
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              window.location.reload();
            }}
          >
            logout
          </button>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="new blog">
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                </div>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User user={foundUser} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
