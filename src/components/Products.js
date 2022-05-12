
import ProductCard from "./ProductCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import {useDeleteProductMutation, useGetProductsQuery} from "../redux/productsApi";

function Products() {
    const {data:products = [], isError, isLoading } = useGetProductsQuery()
    const [deleteProduct] = useDeleteProductMutation();

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{mb: "50px", mt: "20px"}}>Продукты</Typography>
            <Box component='div' sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                {isLoading && <CircularProgress sx={{m: "0 auto"}}/>}
                {isError  && <Typography variant="h5" align="center" sx={{mb: "50px", mt: "20px"}}>Error</Typography>}
                {products?.map(product => {
                    return (
                        <ProductCard key={product.id} product={product} deleteProduct={deleteProduct}/>
                    )
                })}
            </Box>
        </Container>
    )
}

export default Products;