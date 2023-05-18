const listHelper = require('../utils/list_helper');

describe('Total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals likes of that', () => {
    const arrayWithOneBlog = [
      {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'test.url',
        likes: 12,
      },
    ];
    const result = listHelper.totalLikes(arrayWithOneBlog);
    expect(result).toBe(12);
  });

  test('of a bigger list is calculated right', () => {
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
    const result = listHelper.totalLikes(arrayWithManyBlogs);
    expect(result).toBe(8);
  });
});
