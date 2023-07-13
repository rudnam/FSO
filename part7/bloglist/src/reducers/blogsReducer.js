import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlogInState(state, action) {
      const { id } = action.payload;
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { updateBlogInState, appendBlog, setBlogs, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject);
  dispatch(appendBlog(newBlog));
};

export const updateBlog = (updatedBlog) => async (dispatch) => {
  await blogService.update(updatedBlog);
  dispatch(updateBlogInState(updatedBlog));
};

export const deleteBlog = (blogToDelete) => async (dispatch) => {
  await blogService.remove(blogToDelete.id);
  dispatch(removeBlog(blogToDelete));
};

export default blogSlice.reducer;
