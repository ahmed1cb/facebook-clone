import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "../../../Cookie/Cookie";
import api from "../../../services/api";


const getUser = createAsyncThunk('user/get', async (id, { rejectWithValue }) => {
    try {
        let token = Cookie.get('authorization');
        const response = await api.get(`/users/${id}`, {
            headers: {
                Authorization: token
            }
        })
        return response.data;
    } catch (e) {
        return rejectWithValue(e.data)
    }

})

export { getUser }