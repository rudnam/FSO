/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
const Blog = ({ blog }) => (
  <div>
    {blog.title}
    {' '}
    {blog.author}
  </div>
);

export default Blog;
