import React, { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import Modal from "./Modal.jsx";

const api_read_token = import.meta.env.VITE_API_KEY;

const movies = () => {
  const [movieList, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);

  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [moviePageNumber, setMoviePageNumber] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState();
  const [sortMethod, setSortMethod] = useState();

  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = (props) => {
    setModalMovie(props);
    setModal(!modal);
  };

  const toggleFavorite = (movie) => {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter((id) => id !== movie.id));
    } else {
      setFavorites([...favorites, movie.id]);
    }
  };
  const toggleWatched = (movie) => {
    if (watched.includes(movie.id)) {
      setWatched(watched.filter((id) => id !== movie.id));
    } else {
      setWatched([...watched, movie.id]);
    }
  };

  const handleNowPlayingSwitch = () => {
    setShowNowPlaying(!showNowPlaying);
  };

  const handleSearch = () => {
    const fetchSearchData = async () => {
      console.log(sortMethod);

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

    let sortedResults = data.results;
    if (sortMethod === "vote-average-highest") {
      sortedResults = [...data.results].sort((a, b) => b.rating - a.rating);
    } else if (sortMethod === "release-date-newest") {
      sortedResults = [...data.results].sort(
        (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
      );
    } else if (sortMethod === "title-az") {
      sortedResults = [...data.results].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
    setMovies(sortedResults);
  };

  const loadMoreMovies = () => {
    setMoviePageNumber(moviePageNumber + 1);
  };
  //https://api.themoviedb.org/3/search/keyword

  useEffect(() => {
    fetchData(); // CALLS FETCH DATA ON PAGE LOAD ONLY
  }, [moviePageNumber, sortMethod]);

  useEffect(() => {
    if (showNowPlaying) {
      fetchData();
    } else {
      handleSearch();
    }
  }, [showNowPlaying]);

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
              rating={modalMovie.vote_average}
              id={modalMovie.id}
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
      <div className="sort-by">
        <p>Sort by?</p>
        <select onChange={(e) => setSortMethod(e.target.value)}>
          <option value="">None</option>

          <option value="title-az">Title (A-Z)</option>
          <option value="release-date-newest">Release Date (Newest)</option>
          <option value="vote-average-highest">Vote Average (Highest)</option>
        </select>
      </div>
      {movieList.length > 0 ? (
        movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            poster_image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
            onClick={() => toggleModal(movie)}
            isFavorite={favorites.includes(movie.id)}
            isWatched={watched.includes(movie.id)}
            toggleFavorite={() => toggleFavorite(movie)}
            toggleWatch={() => toggleWatched(movie)}
          />
        ))
      ) : (
        <p>No Movies Found :(</p>
      )}
      <div>
        <h4>Page {moviePageNumber}</h4>
        <button onClick={loadMoreMovies}>Next Page</button>
      </div>
    </div>
  );
};

export default movies;
