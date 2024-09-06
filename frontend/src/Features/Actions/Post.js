import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BaseUrl = "http://localhost:5000/post"

export const createPost = createAsyncThunk('post/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BaseUrl}/create`, postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async ({ id, postData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BaseUrl}/update/${id}`, postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BaseUrl}/delete/${id}`);
    return { _id: id };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likeDislikePost = createAsyncThunk('post/likeDislikePost', async ({ id, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BaseUrl}/like/${id}`, { userId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPost = createAsyncThunk('post/getPost', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BaseUrl}/getpost/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getTimelinePosts = createAsyncThunk('post/getTimelinePosts', async ({ rejectWithValue }) => {
  try {
    const response = await axios.get(`${BaseUrl}/getposts`);
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
