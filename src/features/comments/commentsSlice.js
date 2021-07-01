import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

const initialState = {
  comments: [],
  status: {}, //{postId: 'idle', postId2: 'succeeded'}
  error: null,
};

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId) => {
    const res = await client.get(`/posts/${postId}/comments`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("user_token")}`,
      },
    });
    return res.data;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status[action.meta.arg] = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status[action.payload.post] = "succeeded";
      state.comments = state.comments.concat(action.payload);
    },
    [fetchComments.rejected]: (state, action) => {
      state.status[action.meta.arg] = "failed";
      state.error = action.error.msg;
    },
  },
});

export default commentsSlice.reducer;
