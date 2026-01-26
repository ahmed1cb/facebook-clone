import { createSlice } from '@reduxjs/toolkit'
import { getUser } from './Services'

const initialState = {
    user: null,
    state: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (s, a) => {
            s.user = a.payload
        }
    },

    extraReducers: (b) => {
        b.addCase(getUser.pending, (s, a) => {
            s.state = 'Loading'
        }).addCase(getUser.fulfilled, (s, a) => {
            s.state = "Success"
            s.user = a?.payload?.data?.user || null;
        }).addCase(getUser.rejected, (s, a) => {
            let status = a.payload.statusCode;
            s.state = status === 404 ? "NotFound" : "Fail"
        })
    }
})

export default usersSlice.reducer