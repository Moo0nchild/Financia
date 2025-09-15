import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/Logo-sin-fondo.png'

export default function Navbar() {
  const location = useLocation()

  return (
    <header className='sticky top-0 left-0 right-0 z-50 flex justify-between items-center w-full h-20 px-6 bg-white shadow-sm border-b border-gray-100'>
      {/* Logo */}
      <div className='flex justify-center items-center'>
        <img src={logo} alt='logo' className='w-48 h-14 object-contain' />
      </div>

      {/* Links */}
      <nav className='flex-1 max-w-2xl'>
        <ul className='flex items-center justify-end space-x-8'>
          {[
            { path: '/', label: 'Inicio' },
            { path: '/interes', label: 'Tasa de Interés' },
            { path: '/interesSimple', label: 'Interés Simple' },
            { path: '/interesCompuesto', label: 'Interés Compuesto' },
            { path: '/anualidades', label: 'Anualidades' },
          ].map((item) => (
            <li key={item.path} className='list-none'>
              <Link
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                  location.pathname === item.path
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full'></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
