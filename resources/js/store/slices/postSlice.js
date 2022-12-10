import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchPost = createAsyncThunk(
    'user/fetchPosts',
    async () => {
        const res = await api.get('/api/posts');
        return res.data.posts;
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: []
    },
    reducers: {
        setPosts(state, action) {
            console.log(state, action)
            state.posts = action.payload
        },
    },
    extraReducers: {
        [fetchPost.fulfilled]: (state, action) => {
            state.posts = action.payload
        }
    }
})
export const { setPosts } = postSlice.actions
export default postSlice.reducer
