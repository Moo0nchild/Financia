import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">💰 Banco Virtual</div>
      <div className="navbar-links">
        <Link to="/home">Inicio</Link>
        <Link to="/interes">Interés Simple</Link>
        <Link to="/interesCompuesto">Interés Compuesto</Link>
        <Link to="/anualidades">Anualidades</Link>
      </div>
    </nav>
  );
}
