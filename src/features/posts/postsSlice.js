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

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (editedPost) => {
    const { id, ...data } = editedPost;
    const res = await client.put(`/posts/${id}`, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (deletingPost) => {
    const res = await client.delete("/posts/" + deletingPost.id);
    console.log(res.data);
    return res.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    const res = await client.post("/posts", newPost);
    return res.data;
  }
);

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
    //FETCH ALL
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

    //EDIT POST
    [editPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [editPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[postIndex] = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },

    //DELETE POST
    [deletePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "suceeded";

      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },

    //CREATE POST
    [createPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "suceeded";
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.msg;
    },
  },
});

export default postsSlice.reducer;
