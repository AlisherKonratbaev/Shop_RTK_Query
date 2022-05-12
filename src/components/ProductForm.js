import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { display, width } from '@mui/system';


function ProductForm() {
    const [values, setValues] = useState({
        title: '',
        price: '',
        category: '',
        thumbnail: '',
        openAler:false,
        alertText:'',
      });


      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
   
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
         setValues({
            ...values,
            openAler:false,
        });
      };

      const addProductHandler = (e) => {
        e.preventDefault();
        
        // if(values.email === "" || values.name === "" || values.surname === "" || values.password === "" || 
        // values.password !== values.cpassword) {
        //     setValues({
        //         ...values,
        //         openAler:true,
        //         alertText: "Пожалуйста, заполните все поля корректно!"
        //     })
        //     return
        // }

        // const user = {
        //     id: Date.now(),
        //     email: values.email,
        //     name: values.name,
        //     surname: values.surname,
        //     password: values.password
        // }

    

        // setValues(
        //     {...values,   
        //         email: '',
        //         name: '',
        //         surname: '',
        //         password: '',
        //         cpassword: '',
        //     });
      
      }

    return (
        <Container maxWidth="lg">
            <Box className='product-form'
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={addProductHandler}
            >
                 <Typography variant="h4" component="h4" sx={{mb:"20px", textAlign:"center", width:"100%"}}>
                    Add Product form
                </Typography>
                <TextField fullWidth type="text" id="title" label="Title" variant="outlined" sx={{mb:"20px", width:"47%"}} value={values.title}
                onChange={handleChange('title')} />
                <TextField fullWidth type="number" id="price" label="Price" variant="outlined" sx={{mb:"20px", width:"47%"}} value={values.price}
                onChange={handleChange('price')} />
                <TextField fullWidth type="text" id="category" label="Category" variant="outlined" sx={{mb:"20px", width:"47%"}} value={values.category}
                onChange={handleChange('category')} />
                 <TextField fullWidth type="text" id="thumbnail" label="Thumbnail" variant="outlined" sx={{mb:"20px", width:"47%"}} value={values.thumbnail}
                onChange={handleChange('thumbnail')} />
               <div style={{width:"100%"}}>
                <Button  type="submit" variant="contained" size="large" sx={{}} >Save</Button>
                </div>
               
                <Snackbar open={values.openAler} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                        {values.alertText}
                    </Alert>
                </Snackbar>
            </Box>

        </Container>
    )
}
export default ProductForm;