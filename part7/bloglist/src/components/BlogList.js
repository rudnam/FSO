import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <h2 className="text-2xl font-bold">Blogs</h2>
      <Togglable buttonLabel="New blog">
        <BlogForm />
      </Togglable>
      {blogs && blogs.length > 0
        ? [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Link
                to={`/blogs/${blog.id}`}
                className="hover:underline"
                key={blog.id}
              >
                <div className="border border-gray-700 p-4 rounded-md">
                  {blog.title} - {blog.author}
                </div>
              </Link>
            ))
        : null}
    </>
  );
};

export default BlogList;
