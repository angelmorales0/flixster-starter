//The movie's title
//The movie's poster image
//The movie's vote average
//CREATE A COMPONENT SHOWING ALL OF THIS

import React from 'react';
import './MovieCard.css'

const MovieCard = (props) =>{
    return (
        <div className="movie-card">
        <img className="card-image" src={props.poster_image}></img>
        <h2>{props.title}</h2>
        <p>Rating: {props.rating}</p>
        
        </div>
    )

};

export default MovieCard;