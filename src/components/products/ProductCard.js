import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useState} from "react";

import {useGetOrdersQuery, useAddOrderMutation, useChangeOrderMutation} from "../../redux/ordersApi";


function ProductCard({product}) {
    const [state, setState] = useState(
        {
            open: false,
            vertical: 'bottom',
            horizontal: 'right',
        });
    const [addOrder, {}] = useAddOrderMutation();
    const {data:orders = []} = useGetOrdersQuery()
    const [changeOrder, {}] = useChangeOrderMutation()
    const {vertical, horizontal, open} = state;

    const addOrderHandler = async (product) => {
        const findOrder = orders.find(order => order.product_id === product.id)
        const newOrder = {
            product_id: product.id,
            count: 1,
            total_price: product.price,
        }

        if (findOrder) {
            newOrder.id = findOrder.id
            newOrder.count = +findOrder.count + 1
            newOrder.total_price = newOrder.count * product.price;
            changeOrder(newOrder)
        } else {
            addOrder(newOrder)
        }
        setState({...state, open: true});
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({...state, open: false});
    };

    return (
        <Card className="product_card" sx={{maxWidth: 260}}>
            <CardMedia
                component="img"
                height="194"
                image={product.thumbnail}
                alt={product.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    price {product.price} $
                </Typography>

            </CardContent>
            <CardActions disableSpacing>

                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton onClick={() => {
                    addOrderHandler(product)
                }}>
                    <AddShoppingCartIcon/>
                </IconButton>
            </CardActions>
            <Snackbar anchorOrigin={{vertical, horizontal}} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Продкут ({product.title}) добавлен в корзину!
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default ProductCard;