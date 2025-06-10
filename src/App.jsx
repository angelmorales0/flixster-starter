import { useState } from "react";
import "./App.css";
import MovieList from "./movieList";

// import movieCard from './movieCard'
const api_key = import.meta.env.VITE_API_KEY; // gets u api key

const App = () => {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
};

export default App;
