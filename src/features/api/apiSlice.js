import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EXPO_PUBLIC_BASE_URL } from "@env";

const baseQuery = fetchBaseQuery({
  baseUrl: EXPO_PUBLIC_BASE_URL,
  credentials: "include",
  cache: "no-store",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
   
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    api.dispatch(logOut());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "featuredProperty",
    "topRatedProperty",
    "property",
    "ownProperty",
    "singleProperty",
    "savedProperty",
    "propertyReview",
    "userReviews",
    "chatList",
    "chatMessages",
    "chatusers",
    "notificationList",
    "notificationCount",
    "userProfile",
    "userRentedHistory",
    "userOwnRentedHistory"
  ],
  endpoints: (builder) => ({}),
});
