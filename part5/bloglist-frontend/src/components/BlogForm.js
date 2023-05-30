/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
);

export default BlogForm;
