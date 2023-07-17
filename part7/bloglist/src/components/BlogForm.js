import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setErrorMessage } from "../reducers/errorReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    )
      .then(() => {
        dispatch(setNotification(`${title} by ${author} added`, 3));
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((error) => {
        console.error(error);
        dispatch(setErrorMessage(error.response.data.error, 3));
      });
  };
  return (
    <form onSubmit={addBlog} className="flex flex-col gap-2 items-start py-2">
      <h2 className="text-lg">Create new blog</h2>
      <div className="flex gap-2 items-center">
        Title:
        <input
          id="input-title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          className="bg-gray-700 text-sm p-1 rounded-md border border-gray-600 focus:outline-none focus:border-gray-300"
        />
      </div>
      <div className="flex gap-2 items-center">
        Author:
        <input
          id="input-author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          className="bg-gray-700 text-sm p-1 rounded-md border border-gray-600 focus:outline-none focus:border-gray-300"
        />
      </div>
      <div className="flex gap-2 items-center">
        Url:
        <input
          id="input-url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          className="bg-gray-700 text-sm p-1 rounded-md border border-gray-600 focus:outline-none focus:border-gray-300"
        />
      </div>
      <button
        id="create-blog-button"
        type="submit"
        className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800"
      >
        Create
      </button>
    </form>
  );
};

export default BlogForm;
