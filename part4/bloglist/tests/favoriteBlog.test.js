const listHelper = require('../utils/list_helper');

describe('Favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('when list has only one blog is that blog', () => {
    const arrayWithOneBlog = [
      {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'test.url',
        likes: 12,
      },
    ];
    const result = listHelper.favoriteBlog(arrayWithOneBlog);
    const expected = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'test.url',
      likes: 12,
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
    ];
    const result = listHelper.favoriteBlog(arrayWithManyBlogs);
    const expected = {
      title: 'testTitle3',
      author: 'testAuthor3',
      url: 'test3.url',
      likes: 5,
    };
    expect(result).toEqual(expected);
  });
});
