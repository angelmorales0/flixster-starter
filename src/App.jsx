import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./SideBar";

const App = () => {
  const [filter, setFilter] = useState("home");
  const handleFilterChaneg = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar onButtonClick={handleFilterChaneg} />
        <MovieList filter={filter} />
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
