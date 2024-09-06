import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/User';
import authReducer from "./Slices/Auth"
import postSlice from "./Slices/Post"
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    post: postSlice
  },
});

export default store;