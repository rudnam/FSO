/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<Blog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = container.querySelector('#input-title');
  const inputAuthor = container.querySelector('#input-author');
  const inputUrl = container.querySelector('#input-url');

  await user.type(inputTitle, 'Test blog title');
  await user.type(inputAuthor, 'Random author');
  await user.type(inputUrl, 'www.randomurl.com/blog');

  const createButton = container.querySelector('#create-blog-button');

  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Test blog title');
  expect(createBlog.mock.calls[0][0].author).toBe('Random author');
  expect(createBlog.mock.calls[0][0].url).toBe('www.randomurl.com/blog');
});
