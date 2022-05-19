import React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useState} from "react";

function SearchProduct(props) {
    const [text, setText] = useState("")
    const {productsState, setProductsState} = props;

    const searchHandler = (e) => {
        setText(e.target.value);
        productsState.forEach(product => {
            if (product.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                product.isHide = false
            } else product.isHide = true
        })
        setProductsState([...productsState])
    }

    return (
        <Box component='div' sx={{mb: "30px"}}>
            <TextField
                sx={{width: "100%"}}
                id="outlined-basic"
                label="Пойск по товарам"
                variant="outlined"
                value={text}
                onChange={searchHandler}
            />
        </Box>
    );
}

export default SearchProduct;