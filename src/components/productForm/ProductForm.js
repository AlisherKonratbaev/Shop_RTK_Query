import Container from "@mui/material/Container";

import AddProductForm from "./AddProductForm";
import ProductFormTable from "./ProductFormTable";
import React from "react";

function ProductForm() {

    const alertStatus = {
        error: "error",
        success: "success",
    }

    return (
        <Container maxWidth="lg">

            <AddProductForm alertStatus={alertStatus}/>
            <ProductFormTable alertStatus={alertStatus}/>
        </Container>
    )
}

export default ProductForm;