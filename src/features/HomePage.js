import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../../env';

export const HomePage = () => {
    const [state, setState] = useState({
        fetchInProgress: true,
        comedy: []
    });

    const navigate = useNavigate();

    const fetchMovies = async () => {
        try{
            const options = {
                method: 'GET',
                url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
                params: {with_genres: 'comedy', page: '1'},
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
                }
            };
    
            return await axios.request(options).then(async function (response) {
                return await setState({
                    fetchInProgress: false,
                    comedy: response.data.results
                }); 
            }).catch(function (error) {
                console.error(error);
                setState({
                    fetchInProgress: false,
                    comedy: state.comedy
                }); 
            });
        }catch(error){
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchMovies();
    }, [])
    return (
        <Box>
            { state.fetchInProgress ? 
                <CircularProgress/> :
                <Box>
                    <Typography variant="h6">
                        Recent
                    </Typography>
                    <Divider/>
                    <Grid container spacing={2}>
                        {state.comedy.map(movie=>{
                            return (
                                <Grid key={movie.id} item xs={12} sm={4} md={2} lg={2} sx={{ marginTop: '2%' }}>
                                    <Card sx={{ maxWidth: '100%' }}>
                                        <CardActionArea
                                            onClick={()=> {
                                                navigate('/details', {state: movie.id});
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={movie.poster_path}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    {movie.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            }
        </Box>  
    )
}