import logo from '../assets/Logo.png'

export function Footer() {
  return (
    <footer className='h-[300px] w-full text-gray-500 bg-black relative'>
      <p className='absolute mt-10 mb-5 ml-[135px]'>
        <img src={logo} alt='logo' className='w-[150px] h-[50px]' />
      </p>
      <div className='absolute flex flex-wrap py-12 mt-15 ml-[70px] gap-25'>
        <div className='px-4'>
          <ul>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Preguntas frecuentes
              </a>
            </li>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Preferencia de cookies
              </a>
            </li>
          </ul>
        </div>

        <div className='px-4'>
          <ul>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Centro de ayuda
              </a>
            </li>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Información corporativa
              </a>
            </li>
          </ul>
        </div>

        <div className='px-4'>
          <ul>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Términos de uso
              </a>
            </li>
          </ul>
        </div>
        <div className='px-4'>
          <ul>
            <li className='list-none mb-5'>
              <a href='#' className='text-gray-500 text-sm hover:underline'>
                Privacidad
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
