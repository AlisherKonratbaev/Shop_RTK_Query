import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const fetchApi = createApi({
    reducerPath: "fetchApi",
    tagTypes: ['Products', 'Users'],
    baseQuery: fetchBaseQuery({baseUrl:"https://dummyjson.com/"}),
    endpoints: (build) => ({
        fetchProducts: build.query({
            query: () => ({
                url: 'products',
                method: 'GET',
            }),
            providesTags: result => ['Products']
        }),
        fetchUsers: build.query({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
            providesTags: result => ['Users']
        }),
    })
})

export const {useFetchProductsQuery, useFetchUsersQuery} = fetchApi;