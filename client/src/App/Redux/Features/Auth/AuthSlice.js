import { createSlice } from '@reduxjs/toolkit'
import { getAuthorizedUser } from './Services'

const initialState = {
    user: null,
    state: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (s, a) => {
            s.user = a.payload
        },
        clear: (s, a) => {
            s.user = null
        }
    },
    extraReducers: (b) => {
        b.addCase(getAuthorizedUser.pending, (s) => {
            s.loading = true;
            s.state = 'Loading'

        }).addCase(getAuthorizedUser.rejected, (s, a) => {
            let status = a.payload.statusCode
            if (status == 400 || status == 401) {
                s.state = 'Fail'
            } else {
                s.state = 'InternalError'
            }

        }).addCase(getAuthorizedUser.fulfilled, (s, a) => {
            if (a.payload) {
                s.state = 'Success'
                s.user = a.payload.data.user
            }
        })
    }
})

export const { setUser, clear } = authSlice.actions

export default authSlice.reducer