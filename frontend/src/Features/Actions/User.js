import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/users/${userData.id}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  'auth/followUser',
  async (followData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/${followData.id}/follow`, followData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async (unfollowData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/${unfollowData.id}/unfollow`, unfollowData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);