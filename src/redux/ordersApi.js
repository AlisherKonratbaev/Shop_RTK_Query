import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/"}),
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: 'orders',
                method: 'GET',
            }),
            providesTags: result => ['Orders']
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders']
        }),
        addOrder: build.mutation({
            query: (order) => ({
                url: 'orders',
                method: 'POST',
                body: {...order},
            }),
            invalidatesTags: ['Orders']
        }),
        changeOrder: build.mutation({
            query: (order) => ({
                url: `orders/${order.id}`,
                method: 'PUT',
                body: order
            }),
            invalidatesTags: ['Orders']
        }),
    })
})

export const {useGetOrdersQuery, useDeleteOrderMutation, useAddOrderMutation, useChangeOrderMutation} = ordersApi;