const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);
let token;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const saltRounds = 10;
  for (const { username, name, password } of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userObject = new User({
      username,
      name,
      passwordHash,
    });
    await userObject.save();
  }

  // Log in to first user
  const users = await helper.usersInDb();
  const userForTesting = users[0];

  token = jwt.sign(
    userForTesting,
    process.env.SECRET,
    { expiresIn: 60 * 60 },
  );
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog({
      ...blog,
      user: user.id,
    });
    const savedBlog = await blogObject.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
  }
});

describe('when there is initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Title of a new Blog',
        author: 'Authorino',
        url: 'urlfornewblog.com/testing',
        likes: 1,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog);

      expect(response.body.likes).toBe(0);
    });

    test('fails with status code 400 when title is missing from the request', async () => {
      const newBlog = {
        author: 'Authorino',
        url: 'urlfornewblog.com/testing',
        likes: 1,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);
    });

    test('fails with status code 400 when url is missing from the request', async () => {
      const newBlog = {
        title: 'Title of a new Blog',
        author: 'Authorino',
        likes: 1,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);
    });

    test('fails with status code 401 when token is not provided', async () => {
      const newBlog = {
        title: 'Title of a new Blog',
        author: 'Authorino',
        url: 'urlfornewblog.com/testing',
        likes: 1,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 200 when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1,
      );

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe('updating of a blog', () => {
    test('succeeds with status code 200 when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        likes: 1,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      const blogAfterEnd = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

      expect(blogAfterEnd.likes).toBe(1);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
