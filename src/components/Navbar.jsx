import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0 text-white text-xl font-bold tracking-wide'>
            💰 Banco Virtual
          </div>

          {/* Links */}
          <div className='hidden md:flex space-x-6'>
            <Link
              to='/home'
              className='text-white hover:text-yellow-300 transition-colors'
            >
              Inicio
            </Link>
            <Link
              to='/interes'
              className='text-white hover:text-yellow-300 transition-colors'
            >
              Tasa de Interes
            </Link>
            <Link
              to='/interesSimple'
              className='text-white hover:text-yellow-300 transition-colors'
            >
              Interés Simple
            </Link>
            <Link
              to='/interesCompuesto'
              className='text-white hover:text-yellow-300 transition-colors'
            >
              Interés Compuesto
            </Link>
            <Link
              to='/anualidades'
              className='text-white hover:text-yellow-300 transition-colors'
            >
              Anualidades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
