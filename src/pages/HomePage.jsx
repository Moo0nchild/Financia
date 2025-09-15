import PageWrapper from '../components/PageWrapper'
import logo from '../assets/Logo-sin-fondo.png'
import calculadoraSimple from '../assets/interes-simple.jpeg'
import calculadoraCompuesta from '../assets/compuesto.jpg'
import homeBackground from '../assets/home.png'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full h-[90px] px-4 bg-transparent backdrop-blur-sm'>
        <div className='flex justify-center items-center'>
          <img src={logo} alt='logo' className='w-[250px] h-[70px] ml-2.5' />
        </div>
        <div className='w-1/2'>
          <ul className='flex items-center justify-around'>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-white hover:cursor-pointer transition-all duration-200 ease-in-out'>
              <Link to='/home'>Inicio</Link>
            </li>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-white hover:cursor-pointer transition-all duration-200 ease-in-out'>
              <Link to='/servicios'>Servicios</Link>
            </li>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-white hover:cursor-pointer transition-all duration-200 ease-in-out'>
              <Link to='/quienesSomos'>Quienes Somos</Link>
            </li>
            <li className='list-none text-xl font-bold py-1.5 px-4 rounded-2xl text-white bg-[#002B50] hover:bg-blue-800 hover:cursor-pointer transition-all duration-200 ease-in-out'>
              <Link to='/register' className='text-white'>
                Hazte Cliente
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Hero Section */}
      <div
        className='w-full h-screen flex justify-end items-center bg-cover bg-center'
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        <div className='flex justify-center items-center flex-col p-1.5 w-2/5 h-full text-center text-2xl my-4'>
          <p className='text-[#002B50] text-center text-4xl'>
            Tu Banco, sin Complicaciones
          </p>
          <p className='text-gray-800 text-center text-3xl'>
            Rapido, Seguro y Confiable.
          </p>
          <Link
            to='/login'
            className='mt-5 border-none rounded-full bg-[#002B50] text-white py-4 px-8 flex justify-center items-center text-center hover:bg-blue-700 hover:cursor-pointer transition-all duration-300 ease-in-out'
          >
            Conocer Mas
          </Link>
        </div>
      </div>

      {/* Calculator Sections Container */}
      <div className='flex justify-center items-center flex-col mt-5'>
        {/* Simple Interest Section */}
        <div className='flex justify-center items-center w-full h-[500px] p-5 gap-5'>
          <div className='w-3/5 h-full flex justify-center items-center flex-col text-4xl text-[#002B50]'>
            <h1>Calcula tu Interes Simple Facilmente</h1>
            <p className='text-gray-800 text-center text-xl'>
              Descubre cuanto ganarias o pagarias en tus operaciones
            </p>
            <Link
              to='/login'
              className='mt-5 border-none rounded-xl bg-[#002B50] text-white py-2.5 px-8 flex justify-center items-center text-center text-xl w-[250px] hover:bg-blue-700 hover:cursor-pointer transition-all duration-300 ease-in-out'
            >
              Ver Mas
            </Link>
          </div>
          <div className='w-1/2 h-full flex justify-center items-center flex-col'>
            <img
              src={calculadoraSimple}
              alt='interes'
              className='w-4/5 h-4/5 rounded-2xl'
            />
          </div>
        </div>

        {/* Compound Interest Section */}
        <div className='flex justify-center items-center w-full h-[500px] p-5 gap-5 -mt-[120px]'>
          <div className='w-1/2 h-full flex justify-center items-center flex-col'>
            <img
              src={calculadoraCompuesta}
              alt='interes'
              className='w-4/5 h-4/5 rounded-2xl'
            />
          </div>
          <div className='w-3/5 h-full flex justify-center items-center flex-col text-4xl text-[#002B50]'>
            <h1>Calcula tu Interes Compuesto Facilmente</h1>
            <p className='text-gray-800 text-center text-xl'>
              Descubre cuanto ganarias o pagarias en tus operaciones
            </p>
            <Link
              to='/login'
              className='mt-5 border-none rounded-xl bg-[#002B50] text-white py-2.5 px-8 flex justify-center items-center text-center text-xl w-[250px] hover:bg-blue-700 hover:cursor-pointer transition-all duration-300 ease-in-out'
            >
              Ver Mas
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
