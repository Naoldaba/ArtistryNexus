import { createSlice } from '@reduxjs/toolkit';
import { signupUser, loginUser } from '../actions/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    initializeUser: (state) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user) {
        state.user = user;
        state.token = token;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user.username;
        state.token = action.payload.token
        localStorage.setItem("token", state.token)
        localStorage.setItem("user", state.user)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Signup failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user.username;
        state.token = action.payload.token
        localStorage.setItem("token", state.token)
        localStorage.setItem("user", state.user)
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { logout, initializeUser} = authSlice.actions;

export default authSlice.reducer;
