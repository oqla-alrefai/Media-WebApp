import { createSlice } from '@reduxjs/toolkit';
import { createPost, updatePost, deletePost, likeDislikePost, getPost, getTimelinePosts } from '../Actions/Post';

const initialState = {
  posts: [],
  post: null,
  error: null,
  isLoading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post._id !== action.payload._id);
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(likeDislikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeDislikePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(likeDislikePost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getTimelinePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimelinePosts.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getTimelinePosts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
