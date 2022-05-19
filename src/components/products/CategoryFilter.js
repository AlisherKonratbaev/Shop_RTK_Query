import React, {useEffect, useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";

function CategoryFilter(props) {
    const {productsState, setProductsState, categories} = props;
    const [showAll, setShowAll] = useState(true);

    const showCategoryHandle = (e, category) => {

        productsState.forEach(product => {
            if (product.category === category) {
                product.isActive = e.target.checked
            }
        })
        setShowAll(false)
        setProductsState([...productsState]);
    }
    useEffect(() => {
        if(showAll) {
            productsState.forEach(product => {
                product.isActive = true
            })
            setProductsState([...productsState]);
        }
        else {
            productsState.forEach(product => {
                product.isActive = false
            })
            setProductsState([...productsState]);
        }
    }, [setProductsState])

    const categoriesList = () => {
        return categories.map((category, index) => {
            return (
                <FormControlLabel
                    key={index}
                    control={<Checkbox/>}
                    label={category}
                    onChange={(e) => {
                        showCategoryHandle(e, category)
                    }}
                />
            )
        })
    }
    return (
        <FormGroup sx={{mt: "30px"}}>
            <Typography variant="h5" component="h5">
                Categories
            </Typography>
            <FormControlLabel
                control={<Checkbox/>}
                label="All"
                checked={showAll}
                onChange={(e) => {
                    setShowAll(e.target.checked)
                }}
            />
            {categoriesList()}
        </FormGroup>
    );
}

export default CategoryFilter;