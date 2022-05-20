import React from 'react';
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useChangeProductMutation} from "../../redux/productsApi";
import {useChangeOrderMutation} from "../../redux/ordersApi";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ProductFormModal(props) {

    const [values, setValues] = useState({
        title: '',
        price: '',
        category: '',
        thumbnail: '',
    });
    const {product, open, setOpen, values: states, setValues: setStates, alertStatus} = props

    useEffect(() => {
        if (product)
            setValues({
                ...values,
                title: product.title,
                price: product.price,
                category: product.category,
                thumbnail: product.thumbnail
            })
    }, [product])


    const [changeProduct, {}] = useChangeProductMutation();
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const changedProduct = {
            id: product.id,
            title: values.title,
            price: values.price,
            category: values.category,
            thumbnail: values.thumbnail,
        }
        await changeProduct(changedProduct);
        handleClose();
        setStates({
            ...states,
            openAler: true,
            status: alertStatus.success,
            alertText: 'Продукт успешно изменен'
        })
    }
    if (!product) return;
    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {product.title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box className='product-form_change'
                         component="form"
                         noValidate
                         autoComplete="off"
                    >
                        <TextField fullWidth type="text" id="title" label="Title" variant="outlined"
                                   sx={{mb: "20px",}}
                                   value={values.title}
                                   onChange={handleChange('title')}/>
                        <TextField fullWidth type="number" id="price" label="Price" variant="outlined"
                                   sx={{mb: "20px",}} value={values.price}
                                   onChange={handleChange('price')}/>
                        <TextField fullWidth type="text" id="category" label="Category" variant="outlined"
                                   sx={{mb: "20px",}} value={values.category}
                                   onChange={handleChange('category')}/>
                        <TextField fullWidth type="text" id="thumbnail" label="Thumbnail" variant="outlined"
                                   sx={{mb: "20px",}} value={values.thumbnail}
                                   onChange={handleChange('thumbnail')}/>

                        {/*<Snackbar open={values.openAler} autoHideDuration={3000} onClose={handleAlertClose}>*/}
                        {/*    <Alert severity={values.status} onClose={handleAlertClose} sx={{width: '100%'}}>*/}
                        {/*        {values.alertText}*/}
                        {/*    </Alert>*/}
                        {/*</Snackbar>*/}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
