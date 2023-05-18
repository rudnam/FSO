const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog);
  return blogs.length > 0 ? blogs.reduce(reducer) : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
