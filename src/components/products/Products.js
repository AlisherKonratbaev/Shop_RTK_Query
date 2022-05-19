import ProductCard from "./ProductCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import {useGetProductsQuery} from "../../redux/productsApi";
import {useEffect, useState} from "react";
import PriceFilter from "./PriceFilter";
import SearchProduct from "./SearchProduct";

function Products() {
    const {data: products = [], isError, isLoading} = useGetProductsQuery()
    const [productsState, setProductsState] = useState([])

    useEffect(() => {
        const initProducts = JSON.parse(JSON.stringify(products))
        initProducts.forEach(product => {
            product.isHide = false;
            product.isHideFromPrice = false;
        });
        setProductsState([...initProducts])
    }, [products])

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{mb: "50px", mt: "20px"}}>Продукты</Typography>
            <Box component='div' sx={{display: "flex"}}>
                <Box component='div' sx={{width: "25%", mr: "30px", padding: "0 10px"}}>
                    <SearchProduct productsState={productsState} setProductsState={setProductsState} />
                    <PriceFilter products={products} productsState={productsState} setProductsState={setProductsState}/>
                </Box>
                <Box component='div' sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", width:"100%"}}>
                    {isLoading && <CircularProgress sx={{m: "0 auto"}}/>}
                    {isError && <Typography variant="h5" align="center" sx={{mb: "50px", mt: "20px"}}>Error</Typography>}
                    {productsState?.map(product => {
                        if(!product.isHide && !product.isHideFromPrice)
                            return (
                                <ProductCard key={product.id} product={product}/>
                            )
                    })}
                </Box>
            </Box>
        </Container>
    )
}

export default Products;