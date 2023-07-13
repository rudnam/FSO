import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorMessage: errorReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
