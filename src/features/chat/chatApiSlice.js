import { apiSlice } from "../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       createChat: builder.mutation({
            query: credentials => ({
                url: `/chats/create/${credentials?.userId}`,
                method: 'POST',
                body: credentials?.body
            }),
            invalidatesTags:["chatList","chatMessages","chatusers"]
        }),
        sendChat: builder.mutation({
            query: credentials => ({
                url: `/chats/send/${credentials?.userId}`,
                method: 'POST',
                body: credentials?.body
            }),
            invalidatesTags:["chatList","chatMessages","chatusers"]
        }),
      getChatList: builder.query({
            query: credentials => ({
                url: `/chats/list/${credentials?.userId}`,
                method: 'GET',
            }),
            providesTags: ["chatList"]
        }),
        getChatMessages: builder.query({
            query: credentials => ({
                url: `/chats/messages/${credentials?.userId}?chatId=${credentials?.chatId}`,
                method: 'GET',
            }),
            providesTags: ["chatMessages"]
        }),
       getChatUsers : builder.query({
            query: credentials => ({
                url: `/chats/users/${credentials?.userId}`,
                method: 'GET',
            }),
            providesTags: ["chatUsers"]
        }),
        markAsRead : builder.mutation({
            query: credentials => ({
                url: `/chats/mark-as-read/${credentials?.userId}`,
                method: 'PATCH',
                body: credentials?.body
            }),
            invalidatesTags:["chatList","chatMessages","chatusers"]
        })
    })
})

export const {
    useCreateChatMutation,
    useSendChatMutation,
    useGetChatListQuery,
    useGetChatMessagesQuery,
    useGetChatUsersQuery,
    useMarkAsReadMutation
} = chatApiSlice