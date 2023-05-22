const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  // // If the promises need to be executed in a particular order
  // for (let blog of helper.initialBlogs) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }
});

test('correct amount of blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    function returnId() {
      return blog.id;
    }
    expect(returnId()).toBeDefined();
  });
});

test('blog post is successfully created', async () => {
  const newBlog = {
    title: 'Title of a new Blog',
    author: 'Authorino',
    url: 'urlfornewblog.com/testing',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  expect(titles).toContain(
    'Title of a new Blog',
  );
});

test('likes defaults to 0 when missing from the request', async () => {
  const newBlog = {
    title: 'Title of a new Blog',
    author: 'Authorino',
    url: 'urlfornewblog.com/testing',
  };

  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.body.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
