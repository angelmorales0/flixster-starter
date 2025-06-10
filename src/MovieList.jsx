import React, { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import movieData from "./data/data.js";
import Modal from "./Modal.jsx";
const api_read_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UxNmVjMDI2YjhmNzg5MTdlZGY2MGFkNzVlNWJiZCIsIm5iZiI6MTc0OTQ5NTg4Ny4zOSwic3ViIjoiNjg0NzMwNGY3ODgwMWJkYzdjOTEwMzkxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZwEWcqlErEjRZVPsWGd-kn5cFea_4DP5W4to4zhxnl0";

const movies = () => {
  const [movieList, setMovies] = useState([]);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [moviePageNumber, setMoviePageNumber] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState();

  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = (props) => {
    setModalMovie(props);
    setModal(!modal);

    //FIND AND SET MOVIE BY KEY?
    console.log(movieList);
  };

  const handleNowPlayingSwitch = () => {
    setShowNowPlaying(!showNowPlaying);
  };

  const handleSearch = () => {
    const fetchSearchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${api_read_token}`,
            Accept: "application/json",
          },
        }
      );
      const searchData = await res.json();
      console.log(searchData);
      setMovies(searchData.results);
    };
    fetchSearchData();
  };

  //FETCH DATA FIRST

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${moviePageNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${api_read_token}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMovies(data.results);
    console.log(movieList);
  };

  const loadMoreMovies = () => {
    setMoviePageNumber(moviePageNumber + 1);
  };
  //https://api.themoviedb.org/3/search/keyword

  useEffect(() => {
    fetchData(); // CALLS FETCH DATA ON PAGE LOAD ONLY
  }, [moviePageNumber]);

  useEffect(() => {
    if (showNowPlaying) {
      fetchData();
    } else {
      handleSearch();
    }
  }, [showNowPlaying]);

  /**
   *    onClick={toggleModal}
              

              Should show in modal 
   */
  return (
    <div>
      <h1>Movie List</h1>
      <div>
        {modal && (
          <>
            <Modal
              onClick={toggleModal}
              poster_image={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`}
              title={modalMovie.title}
              releaseDate={modalMovie.release_date}
              overview={modalMovie.overview}
              rating={modalMovie.popularity}
            ></Modal>{" "}
          </>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(searchBar) => setSearchQuery(searchBar.target.value)}
          placeholder="Search"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleNowPlayingSwitch}>
          Show now Playing? {String(showNowPlaying)}
        </button>
      </div>
      {movieList.map((movie) => (
        <MovieCard
          key={movie.id}
          poster_image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
          rating={movie.popularity}
          onClick={() => toggleModal(movie)}
        />
      ))}
      <div>
        <h4>Page {moviePageNumber}</h4>
        <button onClick={loadMoreMovies}>Next Page</button>
      </div>
    </div>
  );
};

export default movies;
