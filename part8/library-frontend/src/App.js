import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ME } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  let showWhenLoggedIn = token
    ? { display: "inline-block" }
    : { display: "none" };
  let hideWhenLoggedIn = token
    ? { display: "none" }
    : { display: "inline-block" };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert("book added");
      console.log(data);
    },
  });

  const result = useQuery(ME);
  if (result.loading) {
    return <div>loading...</div>;
  }
  const currentUser = result.data.me;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <Link to="/">
          <button>Authors</button>
        </Link>
        <Link to="/books">
          <button>Books</button>
        </Link>
        <Link to="/addbook" style={showWhenLoggedIn}>
          <button>Add Book</button>
        </Link>
        <Link to="/recommend" style={showWhenLoggedIn}>
          <button>Recommend</button>
        </Link>
        <Link to="/login" style={hideWhenLoggedIn}>
          <button>Login</button>
        </Link>
        <Link to="/login" style={showWhenLoggedIn}>
          <button onClick={logout}>Logout</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addbook" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/recommend"
          element={<Recommend currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
