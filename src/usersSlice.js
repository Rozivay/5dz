import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
  let response;
  const { users } = getState();
  if (users && users.length > 0) {
    response = { data: users };
  } else {
    response = await axios.get('https://jsonplaceholder.typicode.com/users');
    localStorage.setItem('users', JSON.stringify(response.data));
  }
  return response.data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (id, { getState }) => {
  const { users } = getState();
  const user = users.find((user) => user.id === Number(id));
  if (user) {
    return user;
  } else {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: 'idle', error: null },
  reducers: {
    INIT_STATE: (state, action) => {
      return action.payload.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export const { INIT_STATE } = usersSlice.actions;

export default usersSlice.reducer;
