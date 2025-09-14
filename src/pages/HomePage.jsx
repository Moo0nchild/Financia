import { Link, useLocation } from "react-router-dom"
import "../styles/HomePage.css"

export default function Home() {
  const location = useLocation()
  const user = location.state?.user

  // Datos del usuario (ejemplo con foto por defecto si no hay en "user")
  const userData = {
    name: user?.name || "Usuario",
    photo:
      user?.photo ||
      "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/17735246/image/medium-f6f216736722a631686ffe5c95a5d70e.jpg",
  }

  return (
    <div className="home-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">Financia</h2>

          <ul className="nav-links">
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/settings">Configuración</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <img
            src={userData.photo}
            alt="Foto de perfil"
            className="profile-pic"
          />
          <span className="username">{userData.name}</span>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        <h1>Bienvenido, {userData.name} 👋</h1>

        <p>Este es tu panel principal.</p>
        <p>Selecciona un simulador para empezar:</p>

        {/* Sección de simuladores */}
        <div className="simuladores-grid">
          <Link to="/interes" className="simulador-card">
            <h3>📊 Interés Simple</h3>
            <p>Calcula el interés simple de tus inversiones.</p>
          </Link>

          <Link to="/interescompuesto" className="simulador-card">
            <h3>💹 Interés Compuesto</h3>
            <p>Simula el crecimiento con interés compuesto.</p>
          </Link>

          <Link to="/anualidades" className="simulador-card">
            <h3>📅 Anualidades</h3>
            <p>Proyecta pagos periódicos y acumulación de capital.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
