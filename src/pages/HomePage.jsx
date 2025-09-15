// import { Link, useLocation } from 'react-router-dom'
// import '../styles/HomePage.css'
import '../styles/estilos.css'
import PageWrapper from '../components/PageWrapper'
import ImagenPrincipal from '../assets/home.jpg'
import logo from '../assets/Logo-sin-fondo.png'
import calculadoraSimple from '../assets/interes-simple.jpeg'
import calculadoraCompuesta from '../assets/compuesto.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  // const location = useLocation()
  // const user = location.state?.user

  // Datos del usuario (ejemplo con foto por defecto si no hay en "user")
  // const userData = {
  //   name: user?.name || 'Usuario',
  //   photo:
  //     user?.photo ||
  //     'https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/17735246/image/medium-f6f216736722a631686ffe5c95a5d70e.jpg',
  // }

  return (
    <div>
      <header className='header-container'>
        <div className='header-principal'>
          <img src={logo} alt='logo' className='logo-principal' />
        </div>
        <div className='list-container'>
          <ul className='header-list'>
            <li>
              <Link to='/home'>Inicio</Link>
            </li>
            <li>
              <Link to='/cuenta'>Cuenta</Link>
            </li>
            <li>
              <Link to='/servicios'>Servicios</Link>
            </li>
            <li>
              <Link to='/quienesSomos'>Quienes Somos</Link>
            </li>
            <li className='cliente-list'>
              <Link to='/register'>Hazte Cliente</Link>
            </li>
          </ul>
        </div>
      </header>
      <div className='contain-principal'>
        <div className='texto-principal'>
          <p className='texto-principal-p'>Tu Banco, sin Complicaciones</p>
          <p className='texto-secundario-p'>Rapido, Seguro y Confiable.</p>
          <Link to='/login' className='boton-principal'>
            Conocer Mas
          </Link>
        </div>
      </div>

      <div className='container-calculadoras'>
        <div className='interes-simple'>
          <div className='interes-simple-mensaje'>
            <h1>Calcula tu Interes Simple Facilmente</h1>
            <p>Descubre cuanto ganarias o pagarias en tus operaciones</p>
            <Link to='/login' className='boton-simple'>
              Ver Mas
            </Link>
          </div>
          <div className='interes-simple-imagen'>
            <img
              src={calculadoraSimple}
              alt='interes'
              className='imagen-interes'
            />
          </div>
        </div>

        <div className='interes-compuesto'>
          <div className='interes-compuesto-imagen'>
            <img
              src={calculadoraCompuesta}
              alt='interes'
              className='imagen-interes'
            />
          </div>
          <div className='interes-compuesto-mensaje'>
            <h1>Calcula tu Interes Compuesto Facilmente</h1>
            <p>Descubre cuanto ganarias o pagarias en tus operaciones</p>
            <Link to='/login' className='boton-compuesto'>
              Ver Mas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
