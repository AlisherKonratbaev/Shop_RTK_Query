import {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {useFetchUsersQuery, useFetchProductsQuery} from "./redux/fetchApi";
import {useAddProductMutation, useGetProductsQuery} from "./redux/productsApi";
import Products from "./components/products/Products";
import Orders from "./components/Orders";
import Layout from "./components/layout";
import ProductForm from "./components/productForm/ProductForm";

function App() {
    const {data:initData = [], error} = useFetchProductsQuery();
    const {data = []} = useGetProductsQuery()
    const [addProduct, {error:createError}] = useAddProductMutation();

    useEffect(() => {
        const initProduct = async () => {
            if (initData.products) {
                for (const product of initData.products) {
                    await addProduct({...product})
                }
            }
        }
        if(data.length === 0)
        initProduct();
    }, [data])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Products />} />
                    <Route path="productform" element={<ProductForm/>} />
                    <Route path="orders" element={<Orders />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
