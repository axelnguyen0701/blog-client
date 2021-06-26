import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await client.get("/posts");
  return res.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },
  },
});

export default postsSlice.reducer;
