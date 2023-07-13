import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer";
import { setErrorMessage } from "../reducers/errorReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const isOwner = user.username === blog.user.username;

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenNotOwner = { display: !isOwner ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeBlog = (event) => {
    try {
      event.preventDefault();
      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage(exception, 3));
    }
  };

  const removeBlog = (event) => {
    try {
      event.preventDefault();
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog));
      }
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage("Unauthorized deletion", 3));
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      {`${blog.title} ${blog.author}`}
      <button
        className="view-blog-button"
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        view
      </button>
      <button
        className="hide-blog-button"
        style={showWhenVisible}
        onClick={toggleVisibility}
      >
        hide
      </button>
      <div className="blog-details" style={showWhenVisible}>
        {blog.url}
        <br />
        {`likes ${blog.likes}`}
        <button className="like-blog-button" onClick={likeBlog}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        <button
          className="remove-blog-button"
          style={hideWhenNotOwner}
          onClick={removeBlog}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
