import {configureStore} from "@reduxjs/toolkit";
import {fetchApi} from "./fetchApi"
import {productsApi} from "./productsApi";
import {ordersApi} from "./ordersApi";

export const store = configureStore({
    reducer:{
        [fetchApi.reducerPath]:fetchApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            .concat(fetchApi.middleware)
                                            .concat(productsApi.middleware)
                                            .concat(ordersApi.middleware)
})