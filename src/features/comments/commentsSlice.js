import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../apis/client";

const initialState = {
  comments: [],
  status: {}, //{postId: 'idle', postId2: 'succeeded'}
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const res = await client.get(`/posts/${postId}/comments`);
    if (res.data.length === 0) {
      res.data.push({ post: postId, empty: true });
    }
    return res.data;
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data) => {
    const res = await client.post(`/posts/${data.postId}/comments`, data);

    return res.data;
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async (data) => {
    const res = await client.put(
      `/posts/${data.postId}/comments/${data.commentId}`,
      data
    );
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (data) => {
    const res = await client.delete(
      `/posts/${data.postId}/comments/${data.commentId}`,
      data
    );
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
      state.status[action.payload[0].post] = "succeeded";
      if (!action.payload[0].empty) {
        state.comments = state.comments.concat(action.payload);
      }
    },
    [fetchComments.rejected]: (state, action) => {
      state.status[action.meta.arg] = "failed";
      state.error = action.error.msg;
    },
    [createComment.pending]: (state, action) => {
      state.status[action.meta.arg] = "loading";
    },
    [createComment.fulfilled]: (state, action) => {
      state.status[action.payload.post] = "succeeded";
      state.comments = state.comments.concat(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.status[action.meta.arg] = "failed";
      state.error = action.error.msg;
    },
    [deleteComment.pending]: (state, action) => {
      state.status[action.meta.arg] = "loading";
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.status[action.payload.post] = "succeeded";
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload._id
      );
    },
    [deleteComment.rejected]: (state, action) => {
      state.status[action.meta.arg] = "failed";
      state.error = action.error.msg;
    },
    [editComment.pending]: (state, action) => {
      state.status[action.meta.arg] = "loading";
    },
    [editComment.fulfilled]: (state, action) => {
      state.status[action.payload.post] = "succeeded";
      state.comments = [
        ...state.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
        action.payload,
      ];
    },
    [editComment.rejected]: (state, action) => {
      state.status[action.meta.arg] = "failed";
      state.error = action.error.msg;
    },
  },
});

export default commentsSlice.reducer;
