import logo from '../assets/Logo-sin-fondo.png'

export function Footer() {
  return (
    <footer className='w-full bg-gray-900 text-gray-300 py-12 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <img
              src={logo}
              alt='logo'
              className='w-40 h-12 object-contain'
            />
          </div>

          {/* Enlaces */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16'>
            <div>
              <h4 className='font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider'>
                Ayuda
              </h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Centro de ayuda
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider'>
                Legal
              </h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Términos de uso
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider'>
                Empresa
              </h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Información corporativa
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider'>
                Preferencias
              </h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm hover:text-white transition-colors duration-200'
                  >
                    Preferencia de cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className='border-t border-gray-700 my-8'></div>

        {/* Derechos de autor */}
        <div className='text-center text-xs text-gray-500'>
          <p>
            © {new Date().getFullYear()} Financia. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
