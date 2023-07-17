import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog, updateBlog } from "../reducers/blogReducer";
import { setErrorMessage } from "../reducers/errorReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  if (!blog) {
    return <p>No blog found</p>;
  }

  const likeBlog = (event) => {
    try {
      event.preventDefault();
      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage(exception, 3));
    }
  };

  const commentOnBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(commentBlog(comment, blog));
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage(exception, 3));
    }
    setComment("");
  };

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {`${blog.likes} likes`}
      <button className="like-blog-button" onClick={likeBlog}>
        like
      </button>
      <br />
      {`added by ${blog.user.name}`}
      <br />
      <h2>comments</h2>
      <form onSubmit={commentOnBlog}>
        <input
          name="Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button id="add-comment-button" type="submit">
          Add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
