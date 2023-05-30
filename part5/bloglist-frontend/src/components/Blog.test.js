/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders only title and author by default', () => {
  const user = {
    username: 'superuser',
  };
  const blog = {
    title: 'An awesome blog',
    author: 'Random Guy',
    url: 'www.awesomeblogs.com/awesome-test-blog',
    user: {
      username: 'superuser',
    },
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const element = container.querySelector('.blog');
  expect(element).toHaveTextContent(
    'An awesome blog Random Guy',
  );
});
