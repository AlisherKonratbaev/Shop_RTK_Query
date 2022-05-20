import React, {useEffect, useRef, useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";

function CategoryFilter(props) {
    const {productsState, setProductsState, categories} = props;
    const [showAll, setShowAll] = useState(true);
    const [activeCategories, setActiveCategories] = useState([]);


    const showCategoryHandle = (e, category) => {
        setShowAll(false)

        if(e.target.checked) {
            setActiveCategories([...activeCategories, category])
        } else {
            setActiveCategories(activeCategories.filter(cat => cat !== category))
        }
    }

    useEffect(() => {
        if(!showAll) {
            productsState.forEach(product => {
                if(activeCategories.includes(product.category)) {
                    product.isActive = true
                } else product.isActive = false
            })
            setProductsState([...productsState])
            if(activeCategories.length === 0) setShowAll(true)
            else if(activeCategories.length == categories.length) setShowAll(true)
        }
    }, [activeCategories])

    useEffect(() => {
        if(showAll) {
            productsState.forEach(product => {
                product.isActive = true;
            })
            setProductsState([...productsState])

        }
    }, [showAll])

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

    const showAllHandler = (e) => {
        setShowAll(e.target.checked)
    }

    return (
        <FormGroup sx={{mt: "30px"}} >
            <Typography variant="h5" component="h5">
                Categories
            </Typography>
            <FormControlLabel
                control={<Checkbox/>}
                label="All"
                checked={showAll}
                onChange={showAllHandler}
            />
            {categoriesList()}
        </FormGroup>
    );
}

export default CategoryFilter;