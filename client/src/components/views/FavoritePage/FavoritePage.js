import React, { useEffect,useState } from 'react';
import './Favorite.css';
import axios from 'axios';
import {IMAGE_URL} from '../../Config';
import {Popover,Button} from 'antd';

function FavoritePage() {
    const variables = { userFrom : localStorage.getItem('userId') }

    const [FavoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
       
        fetchFavoritedMovies();

    },[])

    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoriteMovie',variables)
        .then(response => {
            if(response.data.success){
               setFavoriteMovies(response.data.favorites)

            }else{
                alert('Failed to get Favorite Movie');
            }
        })
    }

    
    const onClickRemove = (movieId) => {

        const variable = {
            movieId:movieId ,
            userFrom: localStorage.getItem('userId')
        }
        axios.post('/api/favorite/removeFromFavorite',variable)
        .then(response => {
            if(response.data.success){
                fetchFavoritedMovies();

            }else{
                alert("Failed to remove from Favorite")
            }
        })
    }

    const renderTableBody = FavoriteMovies.map((movie,index) => {
        console.log(movie);
        
        const content = (
            <div>
                {movie.movieImage ? 
                <img src={`${IMAGE_URL}w500${movie.movieImage}`}  alt="Movie Poster"/>
                :
                "no Image"
                }
            </div>
        )
        
        return(
            <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
                <td>{((movie.movieRunTime)/60).toPrecision(2)}hrs</td>
                <td><Button type="danger"  onClick={()=>onClickRemove(movie.movieId)}>Remove From Favorite</Button></td>
            </tr>
        );

    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies By Me </h2>
            <hr />
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <th>Remove from favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                      {renderTableBody}
                    </tbody>
                </table>
        </div>
    )
}

export default FavoritePage
