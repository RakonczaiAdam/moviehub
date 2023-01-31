import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from '../../env';

export const Details = () => {
    const [state, setState] = useState({
        fetchInProgress: true,
        movie: {}
    })
    const location = useLocation();

    const fetchDetails = () => {
        try{
            const options = {
            method: 'GET',
            url: 'https://advanced-movie-search.p.rapidapi.com/movies/getdetails',
            params: {movie_id: location.state},
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
            }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setState({
                    fetchInProgress: false,
                    movie: response.data
                })
            }).catch(function (error) {
                console.error(error);
            });
        }catch(error){
            console.log(error.message);
            setState({
                fetchInProgress: false,
                movie: state.movie
            })
        }
    }
    useEffect(()=>{
        fetchDetails();
    }, [])
    return (
        <Box sx={{ margin: '2%' }}>
            { state.fetchInProgress ? 
                <CircularProgress/> : 
                <Box>
                    <Box 
                        component='div'
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%'
                        }}
                    >
                        <img alt='poster' src={state.movie.poster_path} width="30%" />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '69%',
                                // margin: '3%'
                            }}
                            mx={2}
                        >
                            <Typography variant='h6' sx={{marginBottom: '3%'}}>
                                {state.movie.title}
                            </Typography>
                            <Typography sx={{marginBottom: '3%'}}>
                                <b>Vote Average:</b> {state.movie.vote_average} (out of <b>{state.movie.vote_count}</b> votes)
                            </Typography>
                            <Typography sx={{marginBottom: '3%'}}>
                                <b>Genres:</b> {state.movie.genres.map(g => {
                                    return g.name+" "
                                })}
                            </Typography>
                            <Typography sx={{marginBottom: '3%'}}>
                                {state.movie.overview}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}