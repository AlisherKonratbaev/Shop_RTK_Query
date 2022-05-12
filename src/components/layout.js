import {Outlet, NavLink} from 'react-router-dom'

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Layout() {
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <ul className="header_menu" style={{display: "flex", listStyle: 'none'}}>
                            <li>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    <NavLink to="/">Products</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    <NavLink to="/productform">Product Form</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    <NavLink to="/orders">Orders</NavLink>
                                </Typography>
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet/>
            <footer>

            </footer>
        </>
    )
}

export default Layout;