import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h1>123Movies</h1>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>

            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
