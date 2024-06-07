import { apiSlice } from "../api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       createNotification: builder.mutation({
            query: credentials => ({
                url: `/notifications/create/${credentials?.userId}`,
                method: 'POST',
                body: credentials?.body
            }),
            invalidatesTags:["notificationList","notificationCount"]
        }),
      getNotifications: builder.query({
            query: credentials => ({
                url: `/notifications/list/${credentials?.userId}`,
                method: 'GET',
            }),
            providesTags: ["notificationList"],
        }),
        getNotificationCount: builder.query({
            query: credentials => ({
                url: `/notifications/count/${credentials?.userId}`,
                method: 'GET',
            }),
            providesTags: ["notificationCount"]
        }),
        updateNotificationStatus : builder.mutation({
            query: credentials => ({
                url: `/notifications/update/${credentials?.userId}`,
                method: 'PATCH',
                body: credentials?.body
            }),
            invalidatesTags:["notificationList","notificationCount"]
        })
    })
})

export const {
   useCreateNotificationMutation,
   useGetNotificationsQuery,
   useGetNotificationCountQuery,
   useUpdateNotificationStatusMutation,
} = notificationApiSlice