const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'testUser', passwordHash });
    await user.save();

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

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const testUsers = await helper.usersInDb();
      const testUser = testUsers[0];

      const newBlog = {
        title: 'Title of a new Blog',
        author: 'Authorino',
        url: 'urlfornewblog.com/testing',
        likes: 1,
        user: testUser.id,
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
      const testUsers = await helper.usersInDb();
      const testUser = testUsers[0];

      const newBlog = {
        title: 'Title of a new Blog',
        author: 'Authorino',
        url: 'urlfornewblog.com/testing',
        user: testUser.id,
      };

      const response = await api.post('/api/blogs').send(newBlog);
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
        .send(newBlog)
        .expect(400);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 200 when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
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
