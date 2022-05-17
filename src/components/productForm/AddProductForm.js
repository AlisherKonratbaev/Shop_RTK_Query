import React from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import {useAddProductMutation} from "../../redux/productsApi";
import {useState} from "react";

function AddProductForm(props) {
    const alertStatus = props.alertStatus;

    const [values, setValues] = useState({
        title: '',
        price: '',
        category: '',
        thumbnail: '',
        openAler: false,
        status: alertStatus.success,
        alertText: '',
    });

    const [addProduct, {}] = useAddProductMutation();

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setValues({
            ...values,
            openAler: false,
        });
    };

    const addProductHandler = (e) => {
        e.preventDefault();

        if (values.title === "" || values.price === "" || values.category === "") {
            setValues({
                ...values,
                openAler: true,
                status: alertStatus.error,
                alertText: "Пожалуйста, заполните все поля корректно!"
            })
            return
        }

        const product = {
            title: values.title,
            price: values.price,
            category: values.category,
            thumbnail: values.thumbnail
        }

        addProduct(product);

        setValues(
            {
                ...values,
                openAler: true,
                status: alertStatus.success,
                alertText: "Продукт успешно добавлен!",
                title: '',
                price: '',
                category: '',
                thumbnail: '',
            });
    }

    return (
        <Box className='product-form'
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={addProductHandler}
        >
            <Typography variant="h4" component="h4" sx={{mb: "20px", textAlign: "center", width: "100%"}}>
                Add Product form
            </Typography>
            <TextField fullWidth type="text" id="title" label="Title" variant="outlined" sx={{mb: "20px", width: "47%"}}
                       value={values.title}
                       onChange={handleChange('title')}/>
            <TextField fullWidth type="number" id="price" label="Price" variant="outlined"
                       sx={{mb: "20px", width: "47%"}} value={values.price}
                       onChange={handleChange('price')}/>
            <TextField fullWidth type="text" id="category" label="Category" variant="outlined"
                       sx={{mb: "20px", width: "47%"}} value={values.category}
                       onChange={handleChange('category')}/>
            <TextField fullWidth type="text" id="thumbnail" label="Thumbnail" variant="outlined"
                       sx={{mb: "20px", width: "47%"}} value={values.thumbnail}
                       onChange={handleChange('thumbnail')}/>
            <div style={{width: "100%"}}>
                <Button type="submit" variant="contained" size="large" sx={{}}>Save</Button>
            </div>
            <Snackbar open={values.openAler} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={values.status} onClose={handleClose} sx={{width: '100%'}}>
                    {values.alertText}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AddProductForm;

