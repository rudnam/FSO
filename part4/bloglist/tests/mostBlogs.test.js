const listHelper = require('../utils/list_helper');

describe('Most Blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test('when list has only one blog is that blog\'s author', () => {
    const arrayWithOneBlog = [
      {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'test.url',
        likes: 12,
      },
    ];
    const result = listHelper.mostBlogs(arrayWithOneBlog);
    const expected = {
      author: 'testAuthor',
      blogs: 1,
    };
    expect(result).toEqual(expected);
  });

  test('of a bigger list is correctly chosen', () => {
    const arrayWithManyBlogs = [
      {
        title: 'testTitle1',
        author: 'testAuthor1',
        url: 'test1.url',
        likes: 1,
      },
      {
        title: 'testTitle2',
        author: 'testAuthor2',
        url: 'test2.url',
        likes: 2,
      },
      {
        title: 'testTitle3',
        author: 'testAuthor3',
        url: 'test3.url',
        likes: 5,
      },
      {
        title: 'testTitle4',
        author: 'testAuthor2',
        url: 'test4.url',
        likes: 8,
      },
    ];
    const result = listHelper.mostBlogs(arrayWithManyBlogs);
    const expected = {
      author: 'testAuthor2',
      blogs: 2,
    };
    expect(result).toEqual(expected);
  });
});
