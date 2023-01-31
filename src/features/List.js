import { Box, CircularProgress, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { API_KEY } from '../../env';

export const MyList = () => {
    const [state, setState] = useState({
        movies: [],
        fetchInProgress: true,
        page: 1,
        maxPage: 1,
        query: "",
    })

    const location = useLocation();
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try{
            const options = {
                method: 'GET',
                url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
                params: {query: location.state, page: ""+state.page},
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
                }
            };

            return await axios.request(options).then(async (response) => {
                return await setState({
                    movies: response.data.results,
                    fetchInProgress: false,
                    page: state.page,
                    maxPage: response.data.total_pages,
                    query: state.query,
                });
            }).catch((error) => {
                state.fetchInProgress = false;
                setState({
                    movies: state.movies,
                    fetchInProgress: false,
                    page: state.page,
                    maxPage: state.maxPage,
                    query: state.query,
                });
                console.error(error);
            });
        }catch(error){
            console.log(error.message);
        }
    }

    const movePage = (pageNum) => {
        console.log(pageNum);
        state.page = pageNum;
        setState({...state})
        // setState({
        //     movies: state.movies,
        //     fetchInProgress: true,
        //     page: pageNum,
        //     maxPage: state.maxPage,
        //     query: state.query,
        // });
    }

    const setQuery = () => {
        setState({
            query: location.state,
            movies: state.movies,
            fetchInProgress: state.fetchInProgress,
            page: state.page,
            maxPage: state.maxPage,
        })
    }

    useEffect(()=> {
        // const callSetQuery = async () => {
        //     await setQuery();
        //     console.log(state);
        // }
        // callSetQuery();
        fetchMovies();
    }, [location.state]);

    return (
        <Box sx={{ width:'100%' }}>
            <Typography variant='h6'>Results</Typography>
            { state.fetchInProgress ? 
                <CircularProgress/> :
                <List sx={{ width:'100%' }}>
                    {
                        state.movies.map(movie => {
                            return (
                                <ListItem key={movie.id} sx={{ minWidth: "65%", width: '80%', maxWidth: 360, backgroundColor: '#f5f8fa', border: "1px solid lightgray", marginBottom: "2%" }}>
                                    <ListItemButton
                                        onClick={()=>{
                                            navigate('/details', {state: movie.id});
                                        }}
                                    >
                                        <img alt='poster' src={movie.poster_path} width="10%" />
                                        <ListItemText primary={movie.title} sx={{ marginLeft: "5%", fontSize: "20" }}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            }
            <Box sx={{   
                    position: 'fixed',
                    bottom: '5%',
                    right: '10%',
                }}>
                <IconButton onClick={async ()=> {
                    if(state.page > 1){
                        await movePage(state.page-1)
                        fetchMovies();
                    }
                }}>
                    <KeyboardArrowLeftIcon />
                </IconButton>
                {state.page}
                <IconButton onClick={async () => {
                    if(state.page < state.maxPage){
                        await movePage(state.page+1)
                        console.log(state);
                        fetchMovies();
                    }
                }}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box> 
        </Box>
    )
}