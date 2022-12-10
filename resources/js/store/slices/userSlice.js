import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const res = await api.get('/api/me');
        return res.data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser(state, action) {
            console.log(state, action)
            state.user = action.payload
        },
        removeUser(state, action) {
            state.user = {}
        }
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
