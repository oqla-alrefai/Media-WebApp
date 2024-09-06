import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';


export const register = createAsyncThunk("auth/register", async (userData) => {
  try {

    const { data } = await axios.post(
      "http://localhost:5000/auth/register",
      userData
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    let token = localStorage.getItem("userToken") 
    let userId = jwt_decode(token)
    console.log(userId);
    const { data } = await axios.post(
      "http://localhost:5000/auth/login",
      userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    localStorage.setItem("userToken", data.token)
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});
