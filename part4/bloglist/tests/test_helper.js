const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Title of a Blog 1',
    author: 'Blog Author 1',
    url: 'randomurl.com/test',
    likes: 12,
  },
  {
    title: 'Another title of a Blog 2',
    author: 'Blog Author 2',
    url: 'randomurl.com/test2',
    likes: 9,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,
};
