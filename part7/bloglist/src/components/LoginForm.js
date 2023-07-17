import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../reducers/errorReducer";
import { setCurrentUser } from "../reducers/currentUserReducer";
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
      dispatch(setCurrentUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage("wrong username or password", 3));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 bg-gray-800 w-1/2 max-w-md mx-auto mt-36 mb-auto align-middle rounded-lg p-6 border-gray-700 border"
    >
      <h2 className="text-xl font-bold">Log in to application</h2>
      <Error />
      <div className="flex flex-col gap-2">
        Your username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="testuser"
          className="bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="••••••••"
          className="bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-300"
        />
      </div>
      <button
        id="login-button"
        type="submit"
        className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
