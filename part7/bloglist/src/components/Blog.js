import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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
    event.preventDefault();
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    deleteBlog(blog);
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
