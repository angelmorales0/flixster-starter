//The movie's title
//The movie's poster image
//The movie's vote average
//CREATE A COMPONENT SHOWING ALL OF THIS

import React from "react";
import "./MovieCard.css";
import Modal from "./Modal.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MovieCard = (props) => {
  const isFavorite = props.isFavorite;
  const isWatched = props.isWatched;
  const heartClick = (e) => {
    e.stopPropagation();
    props.toggleFavorite();
  };
  const watchClick = (e) => {
    e.stopPropagation();
    props.toggleWatch();
  };
  return (
    <>
      <div className="movie-card" onClick={props.onClick}>
        <img className="card-image" src={props.poster_image}></img>
        <h2>{props.title}</h2>
        <p>Rating: {props.rating}</p>
        <button onClick={heartClick}>
          Favorite
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
        </button>
        <button onClick={watchClick}>
          Watched?
          {isWatched ? <FaHeart color="blue" /> : <FaRegHeart color="gray" />}
        </button>
      </div>
    </>
  );
};

export default MovieCard;
