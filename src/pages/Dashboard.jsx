import PageWrapper from '../components/PageWrapper'
import logo from '../assets/Logo-sin-fondo.png'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

// tus imágenes
import calculadoraInteres from '../assets/interes-simple.jpeg'
import calculadoraSimple from '../assets/compuesto.jpg'
import calculadoraCompuesta from '../assets/Foto2.jpg'
import calculadoraAnualidad from '../assets/Foto1.jpg'

import ConfiguracionImg from '../assets/Configuracion.png'
import UsuarioImg from '../assets/User.png'
import ClaveImg from '../assets/contrasena.png'
import { useEffect, useState } from 'react'
import { obtenerDatosUsuario } from '../firebase/firebaseServices'

export default function HomeLogged() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await obtenerDatosUsuario()
      setUserData(data)
    }
    fetchData()
  }, [])

  if (!userData) return <p>Cargando...</p>

  return (
    <PageWrapper>
      <div>
        {/* Header */}
        <header className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full h-[90px] px-4 bg-transparent backdrop-blur-sm'>
          <div className='flex justify-center items-center'>
            <img src={logo} alt='logo' className='w-[250px] h-[70px] ml-2.5' />
          </div>
          <div className='w-1/2'>
            <ul className='flex items-center justify-around'>
              <li className='list-none text-xl font-bold text-gray-600 hover:text-white transition-all'>
                <Link to='/dashboard'>Inicio</Link>
              </li>
              <li className='list-none text-xl font-bold text-gray-600 hover:text-white transition-all'>
                <Link to='/servicios'>Servicios</Link>
              </li>
              <li className='list-none text-xl font-bold text-gray-600 hover:text-white transition-all'>
                <Link to='/quienesSomos'>Quienes Somos</Link>
              </li>
              {userData && (
                <li className='list-none text-xl font-bold text-[#002B50]'>
                  {userData.nombres || 'Usuario'}
                </li>
              )}
            </ul>
          </div>
        </header>

        {/* Dashboard */}
        <div className='w-full pt-[120px] pb-10 bg-gray-50 min-h-screen'>
          <div className='max-w-6xl mx-auto px-4'>
            <h1 className='text-3xl font-bold text-[#002B50] mb-10'>
              Bienvenido, {userData?.nombres || 'Cliente'}
            </h1>

            {/* Resumen bancario */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
              <div className='bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center'>
                <h2 className='text-xl font-semibold text-[#002B50]'>
                  Mi Saldo
                </h2>
                <p className='text-3xl font-bold text-green-600 mt-2'>
                  $2,450.00
                </p>
              </div>
              <div className='bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center'>
                <h2 className='text-xl font-semibold text-[#002B50]'>
                  Tarjeta de Crédito
                </h2>
                <p className='text-gray-700 mt-2'>**** **** **** 1234</p>
                <p className='text-red-600 font-bold mt-1'>Deuda: $1,200.00</p>
              </div>
              <div className='bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center'>
                <h2 className='text-xl font-semibold text-[#002B50]'>
                  Últimos Movimientos
                </h2>
                <ul className='mt-2 text-gray-700 text-sm'>
                  <li>✔ Depósito - $500</li>
                  <li>✔ Transferencia recibida - $1,200</li>
                  <li>✖ Pago tarjeta - $300</li>
                </ul>
              </div>
            </div>
            {/* Sección Mi Cuenta */}
            <div className='bg-white shadow-lg rounded-2xl p-8 mb-16'>
              <h2 className='text-2xl font-bold text-[#002B50] mb-6 text-center'>
                Mi Cuenta
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Editar Perfil */}
                <Link
                  to='/editar-perfil'
                  className='flex flex-col items-center justify-center p-6 bg-[#F5F7FA] rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all'
                >
                  <img
                    src={UsuarioImg}
                    alt='Editar Perfil'
                    className='w-16 h-16 mb-3 object-contain'
                  />
                  <h3 className='text-lg font-semibold text-[#002B50] mb-1'>
                    Editar Perfil
                  </h3>
                  <p className='text-gray-600 text-center text-sm'>
                    Actualiza tus datos personales y foto de perfil.
                  </p>
                </Link>

                {/* Cambiar Contraseña */}
                <Link
                  to='/cambiar-password'
                  className='flex flex-col items-center justify-center p-6 bg-[#F5F7FA] rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all'
                >
                  <img
                    src={ClaveImg}
                    alt='Cambiar Contraseña'
                    className='w-16 h-16 mb-3 object-contain'
                  />
                  <h3 className='text-lg font-semibold text-[#002B50] mb-1'>
                    Cambiar Contraseña
                  </h3>
                  <p className='text-gray-600 text-center text-sm'>
                    Actualiza tu contraseña de manera segura y rápida.
                  </p>
                </Link>

                {/* Configuración */}
                <Link
                  to='/configuracion'
                  className='flex flex-col items-center justify-center p-6 bg-[#F5F7FA] rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all'
                >
                  <img
                    src={ConfiguracionImg}
                    alt='Configuración'
                    className='w-16 h-16 mb-3 object-contain'
                  />
                  <h3 className='text-lg font-semibold text-[#002B50] mb-1'>
                    Configuración
                  </h3>
                  <p className='text-gray-600 text-center text-sm'>
                    Personaliza tus preferencias y ajustes de la cuenta.
                  </p>
                </Link>
              </div>
            </div>

            {/* Calculadoras / Herramientas financieras */}
            <div className='mt-20 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {/* Tasa de Interés */}
              <div className='bg-white shadow-md rounded-3xl p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
                <img
                  src={calculadoraInteres} // Cambia a imagen representativa
                  alt='tasa de interés'
                  className='w-4/5 h-40 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105'
                />
                <h2 className='text-xl font-bold text-[#002B50] mb-2 text-center'>
                  Tasa de Interés
                </h2>
                <p className='text-gray-600 text-center mb-4'>
                  Consulta y calcula la tasa de interés aplicada a tus
                  operaciones.
                </p>
                <Link
                  to='/interes'
                  className='bg-[#002B50] text-white px-6 py-2 rounded-xl text-lg hover:bg-[#005080] transition-colors'
                >
                  Ver Más
                </Link>
              </div>

              {/* Interés Simple */}
              <div className='bg-white shadow-md rounded-3xl p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
                <img
                  src={calculadoraSimple}
                  alt='interes simple'
                  className='w-4/5 h-40 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105'
                />
                <h2 className='text-xl font-bold text-[#002B50] mb-2 text-center'>
                  Interés Simple
                </h2>
                <p className='text-gray-600 text-center mb-4'>
                  Descubre cuánto ganarías o pagarías en tus operaciones.
                </p>
                <Link
                  to='/interesSimple'
                  className='bg-[#002B50] text-white px-6 py-2 rounded-xl text-lg hover:bg-[#005080] transition-colors'
                >
                  Ver Más
                </Link>
              </div>

              {/* Interés Compuesto */}
              <div className='bg-white shadow-md rounded-3xl p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
                <img
                  src={calculadoraCompuesta}
                  alt='interes compuesto'
                  className='w-4/5 h-40 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105'
                />
                <h2 className='text-xl font-bold text-[#002B50] mb-2 text-center'>
                  Interés Compuesto
                </h2>
                <p className='text-gray-600 text-center mb-4'>
                  Proyecta tus ahorros e inversiones con capitalización.
                </p>
                <Link
                  to='/interesCompuesto'
                  className='bg-[#002B50] text-white px-6 py-2 rounded-xl text-lg hover:bg-[#005080] transition-colors'
                >
                  Ver Más
                </Link>
              </div>

              {/* Anualidades */}
              <div className='bg-white shadow-md rounded-3xl p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
                <img
                  src={calculadoraAnualidad}
                  alt='anualidades'
                  className='w-4/5 h-40 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105'
                />
                <h2 className='text-xl font-bold text-[#002B50] mb-2 text-center'>
                  Anualidades
                </h2>
                <p className='text-gray-600 text-center mb-4'>
                  Evalúa pagos periódicos y planifica tus finanzas.
                </p>
                <Link
                  to='/anualidades'
                  className='bg-[#002B50] text-white px-6 py-2 rounded-xl text-lg hover:bg-[#005080] transition-colors'
                >
                  Ver Más
                </Link>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* Gradiente */}
              <div className='bg-white shadow-md rounded-3xl p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2'>
                <img
                  src={calculadoraAnualidad}
                  alt='anualidades'
                  className='w-4/5 h-40 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105'
                />
                <h2 className='text-xl font-bold text-[#002B50] mb-2 text-center'>
                  Gradientes y Series Variables
                </h2>
                <p className='text-gray-600 text-center mb-4'>
                  Evalúa pagos periódicos y planifica tus finanzas.
                </p>
                <Link
                  to='/gradientes'
                  className='bg-[#002B50] text-white px-6 py-2 rounded-xl text-lg hover:bg-[#005080] transition-colors'
                >
                  Ver Más
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageWrapper>
  )
}
