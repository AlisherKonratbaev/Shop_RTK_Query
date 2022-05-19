import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";

function valuetext(value) {
    return `${value}$`;
}

export default function PriceFilter(props) {
    const [value, setValue] = useState([0, 0]);
    const [minMax, setMinMax] = useState([0, 0])
    const {products, productsState, setProductsState} = props;

    useEffect(() => {
        if (products.length != 0) {
            const prices = products.map(product => product.price);
            const min = Math.min(...prices)
            const max = Math.max(...prices)
            setValue([min, max])
            setMinMax([min, max])
        }
    }, [products])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        productsState.forEach(product => {
            if (newValue[0] <= product.price && product.price <= newValue[1]) {
                product.isHideFromPrice = false
            } else product.isHideFromPrice = true
        })
        setProductsState([...productsState])
    };

    return (
        <Box sx={{width: 300}}>
            <Typography>
                Price filter {value[0]}$ - {value[1]}$
            </Typography>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                min={minMax[0]}
                max={minMax[1]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
