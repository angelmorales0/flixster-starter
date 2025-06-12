import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [extraMovieDetails, setExtraMovieDetails] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const api_read_token = import.meta.env.VITE_API_KEY;

  //useEffect makes an API call to get movie data\

  useEffect(() => {
    //fetches the runtime and genres of movie
    const getDetails = async (movieID) => {
      const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_read_token}`,
        },
      };

      const results = await fetch(url, options);
      const movieData = await results.json();

      let genreArray = [];
      movieData.genres.forEach((genreObject) =>
        genreArray.push(genreObject.name)
      );

      setExtraMovieDetails([genreArray, movieData.runtime]);
    };

    //fetches the video of current movie

    const getVideo = async (id) => {
      const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const trailerOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_read_token}`,
        },
      };

      const fetchedTrailer = await fetch(trailerUrl, trailerOptions);
      const trailerData = await fetchedTrailer.json();
      const trailer = trailerData.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );

      setTrailerKey(trailer.key);
    };
    getDetails(props.id);
    getVideo(props.id);
  }, []);

  return (
    <>
      <div>
        <div className="overlay">
          <section className="modal-content">
            <h2>{props.title}</h2>
            <img
              alt={`coverart for the movie ${movie.title}`}
              src={props.poster_image}
            ></img>
            <iframe
              width="200vw"
              height="300vw"
              src={`https://www.youtube.com/embed/${trailerKey}`}
            ></iframe>
            <p>Released on {props.releaseDate}</p>
            <p>{props.overview}</p>
            <p>Score: {props.rating}</p>
            <p>
              Genres:{" "}
              {extraMovieDetails.length > 0
                ? extraMovieDetails[0].join(" ")
                : "Loading"}
            </p>
            <p>Runtime: {extraMovieDetails[1]} Mins</p>
            <button className="modal-btn" onClick={props.onClick}>
              Close
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
