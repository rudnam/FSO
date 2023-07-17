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
    event.preventDefault();
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch((error) => {
      console.error(error);
      dispatch(setErrorMessage(error.response.data.error, 3));
    });
  };

  const commentOnBlog = (event) => {
    event.preventDefault();

    dispatch(commentBlog(comment, blog))
      .then(() => {
        setComment("");
      })
      .catch((error) => {
        console.error(error);
        dispatch(setErrorMessage(error.response.data.error, 3));
      });
  };

  return (
    <div className="blog flex flex-col items-start gap-2">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <h3 className="text-xl">{blog.author}</h3>
      <a
        href={blog.url}
        className="underline text-blue-600 hover:text-blue-700"
      >
        {blog.url}
      </a>
      <br />
      <div className="flex items-center gap-2">
        {`${blog.likes} likes`}
        <button
          onClick={likeBlog}
          className="like-blog-button bg-blue-700 px-3 py-0.5 rounded-lg hover:bg-blue-800"
        >
          Like
        </button>
      </div>
      <br />
      {`added by ${blog.user.name}`}
      <hr className="h-px w-full my-4 border-0 bg-gray-700" />
      <h2 className="text-xl">Comments</h2>
      <form onSubmit={commentOnBlog} className="flex gap-2.5">
        <input
          name="Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          className="bg-gray-700 text-sm p-1.5 rounded-md border border-gray-600 focus:outline-none focus:border-gray-300"
        />
        <button
          id="add-comment-button"
          type="submit"
          className="bg-blue-700 py-1.5 text-sm px-4 rounded-md hover:bg-blue-800"
        >
          Add comment
        </button>
      </form>
      <ul className="list-disc list-inside">
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
