import ProductCard from "./ProductCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useGetProductsQuery, useSearchProductQuery} from "../redux/productsApi";
import {useEffect, useState} from "react";
import PriceFilter from "./PriceFilter";

function Products() {
    const [text, setText] = useState("")
    const {data: products = [], isError, isLoading} = useGetProductsQuery()
    const {data: searchProducts = [],} = useSearchProductQuery(text);
    const [productsState, setProductsState] = useState([])

    useEffect(() => {
        setProductsState([...products])
    }, [products])

    const searchHandler = (e) => {
        setText(e.target.value);
        const findProducts = products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase() || ""))
        setProductsState([...findProducts])
    }
    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{mb: "50px", mt: "20px"}}>Продукты</Typography>
            <Box component='div' sx={{display: "flex"}}>
                <Box component='div' sx={{width: "25%", mr: "30px", padding: "0 10px"}}>
                    <Box component='form' sx={{mb: "30px"}} onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <TextField sx={{width: "100%"}} id="outlined-basic" label="Пойск по товарам" variant="outlined"
                                   value={text} onChange={(e) => searchHandler(e)}/>
                    </Box>
                    <PriceFilter products={products} productsState={productsState} setProductsState={setProductsState}/>
                </Box>

                <Box component='div' sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", width:"100%"}}>
                    {isLoading && <CircularProgress sx={{m: "0 auto"}}/>}
                    {isError &&
                        <Typography variant="h5" align="center" sx={{mb: "50px", mt: "20px"}}>Error</Typography>}
                    {productsState?.map(product => {
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