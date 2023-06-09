const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const userExtractor = require('../utils/middleware').userExtractor;
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: 'Title and URL are required' });
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token invalid' });
    return;
  }

  const user = request.user;
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token invalid' });
    return;
  }
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!user) {
    response.status(400).json({ error: 'user missing' });
  } else if (!blog) {
    response.status(400).json({ error: 'blog missing' });
  } else if (!user.id || !blog.user || user.id.toString() !== blog.user.toString()) {
    response.status(401).json({
      error: 'Unauthorized deletion',
      user,
      blog,
    });
    return;
  }
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
  response.status(200).json(deletedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
