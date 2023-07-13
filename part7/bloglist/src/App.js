import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setCurrentUser } from "./reducers/currentUserReducer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

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
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
