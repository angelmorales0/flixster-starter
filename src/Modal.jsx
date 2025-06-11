import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [extraMovieDetails, setExtraMovieDetails] = useState([]);

  useEffect(() => {
    const getDetails = async (movieID) => {
      const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UxNmVjMDI2YjhmNzg5MTdlZGY2MGFkNzVlNWJiZCIsIm5iZiI6MTc0OTQ5NTg4Ny4zOSwic3ViIjoiNjg0NzMwNGY3ODgwMWJkYzdjOTEwMzkxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZwEWcqlErEjRZVPsWGd-kn5cFea_4DP5W4to4zhxnl0",
        },
      };

      const results = await fetch(url, options);
      const movieData = await results.json();

      const genres = movieData.genres;

      let genreArray = [];
      genres.forEach((genreObject) => genreArray.push(genreObject.name));
      console.log(genreArray);

      const runtime = movieData.runtime;

      setExtraMovieDetails([genreArray, runtime]);
    };
    getDetails(props.id);
  }, []);

  return (
    <>
      <div>
        <div className="overlay">
          <div className="modal-cotnet">
            <h2>{props.title}</h2>
            <img src={props.poster_image}></img>
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
          </div>
        </div>
      </div>
    </>
  );
}
