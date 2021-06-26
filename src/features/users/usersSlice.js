import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("posts/fetchUsers", async () => {
  const res = await client.get("/users", {
    headers: {
      authorization: `bearer ${localStorage.getItem("user_token")}`,
    },
  });
  return res.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: {
      reducer(state, action) {
        state.users.push(action.payload);
      },
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.users = state.users.concat(action.payload);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },
  },
});

export default usersSlice.reducer;