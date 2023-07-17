import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";
import { setErrorMessage } from "../reducers/errorReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

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
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
