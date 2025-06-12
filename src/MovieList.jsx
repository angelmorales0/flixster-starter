import { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import Modal from "./Modal.jsx";

const api_read_token = import.meta.env.VITE_API_KEY;

const movies = ({ filter }) => {
  const [originalMovieList, setOriginalMovieList] = useState([]);

  const [movieList, setMovies] = useState([]);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [wacthedMovieList, setWatchedMovieList] = useState([]);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [sortMethod, setSortMethod] = useState();

  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState();

  const [moviePageNumber, setMoviePageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  //Code block below toggles modal, favorite stauts,  and watch status
  const toggleModal = (props) => {
    setModalMovie(props);
    setModal(!modal);
  };
  const toggleFavorite = (movie) => {
    if (favoriteMovieList.includes(movie.id)) {
      setFavoriteMovieList(favoriteMovieList.filter((id) => id !== movie.id));
    } else {
      setFavoriteMovieList([...favoriteMovieList, movie.id]);
    }
  };
  const toggleWatched = (movie) => {
    if (wacthedMovieList.includes(movie.id)) {
      setWatchedMovieList(wacthedMovieList.filter((id) => id !== movie.id));
    } else {
      setWatchedMovieList([...wacthedMovieList, movie.id]);
    }
  };

  //This use Effect is used to set the movie Filters for watched and favorited
  useEffect(() => {
    if (filter === "home") {
      setMovies(originalMovieList);
    } else if (filter === "favorites") {
      setMovies(
        originalMovieList.filter((movie) =>
          favoriteMovieList.includes(movie.id)
        )
      );
    } else if (filter === "watched") {
      setMovies(
        originalMovieList.filter((movie) => wacthedMovieList.includes(movie.id))
      );
    }
  }, [filter]);

  const handleNowPlayingSwitch = () => {
    setShowNowPlaying(!showNowPlaying);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setShowNowPlaying(true);
  };
  const searchForMovies = () => {
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
      setMovies(searchData.results);
      setShowNowPlaying(false);
    };
    fetchSearchData();
  };

  //FETCH DATA FIRST

  const fetchData = async () => {
    const fetchedMovieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${moviePageNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${api_read_token}`,
          "Content-type": "application/json",
        },
      }
    );
    const fetchedMovieData = await fetchedMovieResponse.json();

    let sortedResults = fetchedMovieData.results;
    console.log(fetchedMovieData.results);
    if (sortMethod === "vote-average-highest") {
      sortedResults = [...fetchedMovieData.results].sort(
        (a, b) => b.vote_average - a.vote_average
      );
    } else if (sortMethod === "release-date-newest") {
      sortedResults = [...fetchedMovieData.results].sort(
        (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
      );
    } else if (sortMethod === "title-az") {
      sortedResults = [...fetchedMovieData.results].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
    if (moviePageNumber == 1) {
      setMovies(sortedResults);
      setOriginalMovieList(sortedResults);
    } else {
      setMovies([...movieList, ...sortedResults]);
    }
  };

  const loadMoreMovies = () => {
    setMoviePageNumber(moviePageNumber + 1);
  };

  //Used to fetch movie data on new page load OR when a new sort method is called
  useEffect(() => {
    fetchData();
  }, [moviePageNumber, sortMethod]);

  useEffect(() => {
    if (showNowPlaying) {
      fetchData();
    } else {
      searchForMovies();
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
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page reload
            searchForMovies();
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">Search</button>
          <button type="button" onClick={clearSearch}>
            Clear
          </button>
        </form>
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
      <ul className="movie-list">
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              poster_image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              onClick={() => toggleModal(movie)}
              isFavorite={favoriteMovieList.includes(movie.id)}
              isWatched={wacthedMovieList.includes(movie.id)}
              toggleFavorite={() => toggleFavorite(movie)}
              toggleWatch={() => toggleWatched(movie)}
            />
          ))
        ) : (
          <p>No Movies Found :(</p>
        )}
      </ul>
      <div>
        <h4>Page {moviePageNumber}</h4>
        <button onClick={loadMoreMovies}>Next Page</button>
      </div>
    </div>
  );
};

export default movies;
