import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: user => {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                      },
                    body: user 
                }
            }
        }),
        resetCode: builder.mutation({
            query: email => ({
                url: '/auth/resetcode',
                method: 'POST',
                body: email
            })
        }),
        resetPassword: builder.mutation({
            query: credentials => ({
                url: '/auth/resetpassword',
                method: 'POST',
                body: credentials
            })
        }),
        changePassword: builder.mutation({
            query: credentials => ({
                url: `/users/change-password/${credentials?.userId}`,
                method: 'PATCH',
                body: credentials?.body
            })
        }),    
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useResetCodeMutation,
    useResetPasswordMutation,
    useChangePasswordMutation
} = authApiSlice