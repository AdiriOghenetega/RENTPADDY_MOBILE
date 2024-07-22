import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getuserProfile: builder.query({
            query: credentials => ({
                url: `/users/profile/${credentials?.userId}`,
                method: 'GET',
            }),
            providesTags: ["userProfile"]
        }),
       updateuser: builder.mutation({
            query: credentials => ({
                url: `/users/${credentials?.userId}`,
                method: 'PATCH',
                body: credentials?.body
            }),
            invalidatesTags:["userProfile"]
        }),
        deleteUser : builder.mutation({
            query: credentials => ({
                url: `/users/${credentials?.userId}`,
                method: 'DELETE',
            }),
            invalidatesTags:["userProfile"]
        }),
        deleteUserProfile : builder.mutation({
            query: credentials => ({
                url: `/users/profile/${credentials?.userId}`,
                method: 'DELETE',
            }),
            invalidatesTags:["userProfile"]
        })
    })
})

export const {
    useGetuserProfileQuery,
    useDeleteUserMutation,
    useUpdateuserMutation,
    useDeleteUserProfileMutation
} = userApiSlice