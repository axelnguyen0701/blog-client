import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  loggedIn: false,
  currentUser: "",
  fetchStatus: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await client.get("/users");
  return res.data;
});

export const loginUser = createAsyncThunk("users/loginUser", async (data) => {
  const res = await client.post("/auth/login", data);
  localStorage.setItem("user_token", res.data.token);
  return res.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userLoggedOut: {
      reducer(state, action) {
        state.loggedIn = false;
        state.currentUser = "";
      },
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.fetchStatus = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.fetchStatus = "succeeded";

      state.users = state.users.concat(action.payload);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.fetchStatus = "failed";
      state.error = action.error.msg;
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loggedIn = true;

      state.currentUser = action.payload.user.username;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },
  },
});
export const { userLoggedOut } = usersSlice.actions;
export default usersSlice.reducer;
