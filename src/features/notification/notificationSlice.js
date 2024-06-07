import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: { expoPushToken: null,notificationIdentifier:null },
    reducers: {
        pushTokenRedux: (state, action) => {
            state.expoPushToken = action.payload;
        },
        updateIdentifierRedux:(state,action) => {
            state.notificationIdentifier = action.payload
          },
    },
})

export const { pushTokenRedux,updateIdentifierRedux } = notificationSlice.actions

export default notificationSlice.reducer

export const selectPushToken = (state) => state.notification.expoPushToken
export const selectNotificationIdentifier = (state) => state.notification.notificationIdentifier