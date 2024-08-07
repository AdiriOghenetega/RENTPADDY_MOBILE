import { apiSlice } from "../api/apiSlice";
import { secureGetItemAsync } from "../../utils/expoSecure";


export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProperties: builder.query({
      query: () => "/featured",
      providesTags: ["featuredProperty"],
      transformResponse: async (response, meta, arg) => {
        const user = await secureGetItemAsync("user"); // Access currentUser
        const filteredProperties = response.filter(
          (property) => property.owner !== user._id && property.avaliability === true
        );
        return filteredProperties.sort((a, b) => b.id - a.id)
      },
    }),
    getTopProperties: builder.query({
      query: () => "/top-rated",
      providesTags: ["topRatedProperty"],
        transformResponse: async (response, meta, arg) => {
        const user = await secureGetItemAsync("user"); // Access currentUser
        const filteredProperties = response.filter(
          (property) => property.owner !== user._id && property.avaliability === true
        );
        return filteredProperties.sort((a, b) => b.id - a.id)
      },
    }),
    getAllProperties: builder.query({
      query: () => "/properties",
      providesTags: ["property"],
        transformResponse: async (response, meta, arg) => {
        const user = await secureGetItemAsync("user"); // Access currentUser
        const filteredProperties = response.filter(
          (property) => property.owner !== user._id && property.avaliability === true
        );
        return filteredProperties.sort((a, b) => b.id - a.id)
      },
    }),
    getProperty: builder.query({
      query: (id) => ({
        url: `/properties/${id}`,
      }),
      providesTags: ["singleProperty"],
    }),
    getOwnProperties: builder.query({
      query: (id) => ({
        url: `/owned/${id}`,
      }),
      providesTags: ["ownProperty"],
      transformResponse: (res) => res?.sort((a, b) => b.id - a.id),
    }),
    getPropertyReviews: builder.query({
        query: (propertyId) => ({
        url: `/review/get?propertyId=${propertyId}`,
        }),
        providesTags:["propertyReview"],
    }),
    getUserPropertyReviews: builder.query({
        query: (userId) => ({
        url: `/reviews/user/${userId}`
        }),
        providesTags:["userReviews"],
    }),
    getSavedProperties: builder.query({
        query: () => ({
        url: `/saved`,
      }),
      providesTags: ["savedProperty"],
      transformResponse: (res) => res?.sort((a, b) => b.id - a.id),
    }),
    saveProperty: builder.mutation({
        invalidatesTags: ["savedProperty"],
        query: (credentials) => {
            console.log(credentials,"credentials")
            return {
                url: `/saved`,
                method: 'POST',
                body: {propertyId:credentials}
              }
        }
    }),
    uploadProperty: builder.mutation({
      invalidatesTags: [
        "ownProperty",
        "singleProperty",
        "featuredProperty",
        "topRatedProperty",
        "property",
      ],
      query: (credentials) => {
        return {
          url: `/properties/create/${credentials?.userId}`,
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: credentials?.formdata,
        };
      },
    }),
    postPropertyReview: builder.mutation({
        invalidatesTags: ["propertyReview","userReviews"],
      query: (credentials) => ({
        url: `/review/create`,
        method: "POST",
        body: credentials,
      }),
    }),
    updatePropertyReview: builder.mutation({
        invalidatesTags: ["propertyReview","userReviews"],
      query: (credentials) => ({
        url: `/review/update?reviewId=${credentials?.reviewId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
    }),
    updateProperty: builder.mutation({
      invalidatesTags: [
        "ownProperty",
        "singleProperty",
        "featuredProperty",
        "topRatedProperty",
        "property",
      ],
      query: (credentials) => ({
        url: `/properties/update/${credentials?.userId}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: credentials?.formdata,
      }),
    }),
    updateAvaliability: builder.mutation({
      invalidatesTags: [
        "ownProperty",
        "singleProperty",
        "featuredProperty",
        "topRatedProperty",
        "property",
      ],
      query: (credentials) => ({
        url: `/properties/avaliability/${credentials?.userId}`,
        method: "PATCH",
        body: credentials?.body,
      }),
    }),
    likeProperty: builder.mutation({
      invalidatesTags: [
        "ownProperty",
        "singleProperty",
        "featuredProperty",
        "topRatedProperty",
        "property",
        "savedProperty"
      ],
      query: (propertyId) => ({
        url: `/properties/like`,
        method: "PATCH",
        body:propertyId
      }),
    }),
    unSaveProperty: builder.mutation({
        invalidatesTags: ["savedProperty"],
      query: ({propertyId}) => ({
        url: `/saved`,
        method: "PATCH",
        body: { 
          propertyId: propertyId
        }
      }),
    }),
    deleteProperty: builder.mutation({
      invalidatesTags: [
        "ownProperty",
        "singleProperty",
        "featuredProperty",
        "topRatedProperty",
        "property",
      ],
      query: (credentials) => ({
        url: `/properties/delete/${credentials?.userId}`,
        method: "DELETE",
        body: credentials?.body
      }),
    }),
    deletePropertyReview: builder.mutation({
        invalidatesTags: ["propertyReview","userReviews"],
      query: (credentials) => ({
        url: `/review/delete?reviewId=${credentials?.reviewId}`,
        method: "DELETE",
      }),
    })
  }),
});

export const {
  useGetFeaturedPropertiesQuery,
  useGetTopPropertiesQuery,
  useGetAllPropertiesQuery,
  useGetPropertyQuery,
  useGetOwnPropertiesQuery,
  useUploadPropertyMutation,
  useUpdatePropertyMutation,
  useUpdateAvaliabilityMutation,
  useLikePropertyMutation,
  useDeletePropertyMutation,
  useGetSavedPropertiesQuery,
  useSavePropertyMutation,
  useUnSavePropertyMutation,
  useGetPropertyReviewsQuery,
  usePostPropertyReviewMutation,
  useUpdatePropertyReviewMutation,
  useDeletePropertyReviewMutation,
  useGetUserPropertyReviewsQuery
} = propertiesApiSlice;
