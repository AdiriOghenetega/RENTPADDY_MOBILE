import { createSlice } from "@reduxjs/toolkit"
import { removeItemFromSecureStore } from "../../utils/expoSecure"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
            state.token = action.payload?.sessionToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            removeItemFromSecureStore("user")
            removeItemFromSecureStore("notification")
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token