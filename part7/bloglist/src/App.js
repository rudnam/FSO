/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Error from './components/Error';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, [JSON.stringify(blogs)]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.error(exception);
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      setNotifMessage(`${blogObject.title} by ${blogObject.author} added`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    } catch (exception) {
      console.error(exception);
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject);
      setBlogs(blogs.map((blog) => (
        blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      )));
    } catch (exception) {
      console.error(exception);
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject.id);
        setBlogs(blogs.filter((blog) => (
          blog.id !== blogObject.id)));
      }
    } catch (exception) {
      console.error(exception);
      setErrorMessage('Unauthorized deletion');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      {user === null
        ? (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            errorMessage={errorMessage}
          />
        )
        : (
          <div>
            <h2>blogs</h2>
            <Notification message={notifMessage} />
            <Error message={errorMessage} />
            {user.name}
            {' '}
            logged in
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser');
                window.location.reload();
              }}
            >
              logout
            </button>
            <Togglable buttonLabel="new blog">
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={handleLike}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default App;
