import "./MovieCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MovieCard = (movie) => {
  const isFavorite = movie.isFavorite;
  const isWatched = movie.isWatched;
  const heartClick = (e) => {
    e.stopPropagation();
    movie.toggleFavorite();
  };
  const watchClick = (e) => {
    e.stopPropagation();
    movie.toggleWatch();
  };
  return (
    <>
      <div className="movie-card" onClick={movie.onClick}>
        <img
          alt={`coverart for the movie ${movie.title}`}
          className="card-image"
          src={movie.poster_image}
        ></img>
        <h2>{movie.title}</h2>

        <p>Rating: {movie.rating}</p>
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
