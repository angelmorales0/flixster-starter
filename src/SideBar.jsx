export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <button onClick={() => props.onButtonClick("home")}>Home</button>
      <button onClick={() => props.onButtonClick("favorites")}>
        Favorites
      </button>
      <button onClick={() => props.onButtonClick("watched")}>Watched</button>
    </div>
  );
}
