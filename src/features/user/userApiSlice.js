import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getuserProfile: builder.query({
      query: (credentials) => ({
        url: `/users/profile/${credentials?.userId}`,
        method: "GET",
      }),
      providesTags: ["userProfile"],
    }),
    getUserRentedHistory: builder.query({
      query: (credentials) => ({
        url: `/users/property/history/${credentials?.userId}`,
        method: "GET",
      }),
      providesTags: ["userRentedHistory"],
    }),
    getUserOwnRentedHistory: builder.query({
      query: (credentials) => ({
        url: `/users/own/property/history/${credentials?.userId}`,
        method: "GET",
      }),
      providesTags: ["userOwnRentedHistory"],
    }),
    sendNotificationBookRequest: builder.mutation({
      query: (credentials) => ({
        url: "/users/send/notification/request",
        method: "POST",
        body: credentials?.body,
      }),
    }),
    sendNotificationBookAccept: builder.mutation({
      query: (credentials) => ({
        url: "/users/send/notification/accept",
        method: "POST",
        body: credentials?.body,
      }),
    }),
    sendNotificationBookDecline: builder.mutation({
      query: (credentials) => ({
        url: "/users/send/notification/decline",
        method: "POST",
        body: credentials?.body,
      }),
    }),
    sendNotificationBookExpired: builder.mutation({
      query: (credentials) => ({
        url: "/users/send/notification/expired",
        method: "POST",
        body: credentials?.body,
      }),
    }),
    updateuser: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userProfile"],
    }),
    addRentedHistory: builder.mutation({
      query: (credentials) => ({
        url: `/users/add/rented/history/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userRentedHistory"],
    }),
    addOwnRentedHistory: builder.mutation({
      query: (credentials) => {
        console.log(credentials);
        return {
          url: `/users/own/add/rented/history/${credentials?.userId}`,
          method: "PATCH",
          body: credentials?.body,
        };
      },
      invalidatesTags: ["userOwnRentedHistory"],
    }),
    removeRentedHistory: builder.mutation({
      query: (credentials) => ({
        url: `/users/remove/rented/history/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userRentedHistory"],
    }),
    removeOwnRentedHistory: builder.mutation({
      query: (credentials) => ({
        url: `/users/own/remove/rented/history/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userOwnRentedHistory"],
    }),
    clearRentedHistory: builder.mutation({
      query: (credentials) => ({
        url: `/users/clear/rented/history/${credentials?.userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["userRentedHistory"],
    }),
    clearOwnRentedHistory: builder.mutation({
      query: (credentials) => ({
        url: `/users/own/clear/rented/history/${credentials?.userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["userOwnRentedHistory"],
    }),
    updateRentedStatus: builder.mutation({
      query: (credentials) => ({
        url: `/users/update/rented/status/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userRentedHistory"],
    }),
    updateOwnRentedStatus: builder.mutation({
      query: (credentials) => ({
        url: `/users/own/update/rented/status/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
      invalidatesTags: ["userOwnRentedHistory"],
    }),
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials?.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userProfile"],
    }),
    deleteUserProfile: builder.mutation({
      query: (credentials) => ({
        url: `/users/profile/${credentials?.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const {
  useGetuserProfileQuery,
  useDeleteUserMutation,
  useUpdateuserMutation,
  useDeleteUserProfileMutation,
  useGetUserOwnRentedHistoryQuery,
  useGetUserRentedHistoryQuery,
  useAddRentedHistoryMutation,
  useAddOwnRentedHistoryMutation,
  useRemoveOwnRentedHistoryMutation,
  useRemoveRentedHistoryMutation,
  useClearOwnRentedHistoryMutation,
  useClearRentedHistoryMutation,
  useUpdateOwnRentedStatusMutation,
  useUpdateRentedStatusMutation,
  useSendNotificationBookRequestMutation,
  useSendNotificationBookAcceptMutation,
  useSendNotificationBookDeclineMutation,
  useSendNotificationBookExpiredMutation
} = userApiSlice;
