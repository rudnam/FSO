const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: 'Title and URL are required' });
    return;
  }
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
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
