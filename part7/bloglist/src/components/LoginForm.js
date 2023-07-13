import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../reducers/errorReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import Error from "./Error";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage("wrong username or password", 3));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Error />
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
