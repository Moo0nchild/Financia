import { Link, useLocation } from "react-router-dom"
import "../styles/HomePage.css"

export default function Home() {
  const location = useLocation()
  const user = location.state?.user
  const user2 = {
    photo: "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/17735246/image/medium-f6f216736722a631686ffe5c95a5d70e.jpg" 
  }

  return (
    <div className="home-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">MiApp</h2>
          <ul className="nav-links">
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/settings">Configuración</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <img src={user2.photo} alt="Foto de perfil" className="profile-pic" />
          <span className="username">{user?.name}</span>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        <h1>Bienvenido, {user?.name} 👋</h1>
        <p>Este es tu panel principal.</p>
      </div>
    </div>
  )
}
