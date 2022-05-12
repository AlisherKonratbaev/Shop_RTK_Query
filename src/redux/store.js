import {configureStore} from "@reduxjs/toolkit";
import {fetchApi} from "./fetchApi"
import {productsApi} from "./productsApi";

export const store = configureStore({
    reducer:{
        [fetchApi.reducerPath]:fetchApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware).concat(productsApi.middleware)
})