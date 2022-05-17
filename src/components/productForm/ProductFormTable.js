import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import Box from "@mui/material/Box";
import {useState} from "react";
import {useDeleteProductMutation, useGetProductsQuery} from "../../redux/productsApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ProductFormModal from "./ProductFormModal";

function ProductFormTable(props) {
    const alertStatus = props.alertStatus;

    const [values, setValues] = useState({
        openAler: false,
        status: alertStatus.success,
        alertText: '',
        currentProduct: null,
    });
    const [open, setOpen] = useState(false);

    const {data: products = []} = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setValues({
            ...values,
            openAler: false,
        });
    };

    const deleteProductHandler = async (product) => {
        await deleteProduct(product);
        setValues({
            ...values,
            openAler: true,
            status: alertStatus.success,
            alertText: `Продукт ${product.title} успешно удален!`,
        })
    }
    const openModalHandler = (product) => {
        setValues({...values, currentProduct: product})
        setOpen(true);
    }
    return (
        <Box component="div">
            <TableContainer sx={{mt: "50px", mb: "50px"}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell><img width={170} src={product.thumbnail}
                                                    alt={product.title}/></TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price} $</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {openModalHandler(product)}}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            deleteProductHandler(product)
                                        }}>
                                            <DeleteForeverTwoToneIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={values.openAler} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={values.status} onClose={handleClose} sx={{width: '100%'}}>
                    {values.alertText}
                </Alert>
            </Snackbar>
            <ProductFormModal product={values.currentProduct} open={open} setOpen={setOpen} values={values} setValues={setValues} alertStatus={alertStatus}/>
        </Box>
    );
}

export default ProductFormTable;