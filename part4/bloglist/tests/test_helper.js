const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Superuser\'s blog #1',
    author: 'Superuser',
    url: 'superuser.com/test',
    likes: 12,
  },
  {
    title: 'Superuser\'s blog #2',
    author: 'Superuser',
    url: 'superuser.com/test2',
    likes: 9,
  },
  {
    title: 'RandomGuy\'s cool blog',
    author: 'RandomGuy',
    url: 'randomguy.com/blog',
    likes: 1,
  },
];

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'notASafePassword',
  },
  {
    username: 'user1',
    name: 'RandomGuy',
    password: 'RandomPassword',
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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb,
};
