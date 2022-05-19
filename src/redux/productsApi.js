import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001/"}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: (limit = 30) => ({
                url: 'products',
                method: 'GET',
                params: {
                    _limit: limit,
                }
            }),
            providesTags: result => ['Products']
        }),
        addProduct: build.mutation({
            query: (product) => ({
                url: 'products',
                method: 'POST',
                body: {...product},
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: build.mutation({
            query: (product) => ({
                url: `products/${product.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
        changeProduct: build.mutation({
            query: (product) => ({
                url: `products/${product.id}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
    })
})

export const {useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useChangeProductMutation} = productsApi;