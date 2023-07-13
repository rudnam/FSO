import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.currentUser);

  return (
    <div>
      {blogs && blogs.length > 0
        ? [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
        : null}
    </div>
  );
};

export default BlogList;
