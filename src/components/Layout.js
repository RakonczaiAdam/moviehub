import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export const Layout = (props) => {
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setState(e.target.value);
    }

    const handleClick = () => {
        navigate('/list', {state: state})
    }
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Button 
                        onClick={()=>{
                            navigate('/');
                        }}
                        sx={{fontSize: 20, color: 'white', marginRight: '5%'}}
                    >
                    Movie Hub
                        {/* <Typography
                            component='div'
                            variant='h6'
                            mr={2}
                        >
                            Movie Hub
                        </Typography> */}
                    </Button>
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField color='secondary' size='small' label="Search" variant="outlined" onChange={handleChange} />
                        <IconButton onClick={handleClick} sx={{color: "white"}}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component='main' sx={{p: 3}}>
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    )
}