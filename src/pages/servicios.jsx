import React from 'react'
import { ArrowRight } from 'lucide-react'
import logo from '../assets/Logo-sin-fondo.png'
import { Link } from 'react-router-dom'

export default function ServiciosPage() {
  const servicios = [
    {
      title: 'Cuentas',
      desc: 'Corriente y ahorro con banca en línea, sin comisiones ocultas.',
      cta: 'Abrir cuenta',
    },
    {
      title: 'Créditos',
      desc: 'Préstamos personales, hipotecarios y para emprendimientos.',
      cta: 'Simular crédito',
    },
    {
      title: 'Tarjetas',
      desc: 'Tarjetas de débito y crédito con beneficios y control desde la app.',
      cta: 'Solicitar tarjeta',
    },
    {
      title: 'Inversiones',
      desc: 'Fondos y productos para hacer crecer tu dinero: plazo fijo y mercados.',
      cta: 'Ver opciones',
    },
    {
      title: 'Simuladores',
      desc: 'Calculadora de interés simple, compuesto y anualidades.',
      cta: 'Ir al simulador',
    },
    {
      title: 'Asesoría Financiera',
      desc: 'Planificación personalizada para tus metas financieras.',
      cta: 'Pedir asesoría',
    },
  ]

  return (
    <main className='min-h-screen bg-slate-50 text-slate-900'>
      {/* Header convertido a Tailwind */}
      <header className='flex justify-between items-center flex-row w-full h-[90px] px-4 bg-white shadow-md'>
        <div>
          <img
            src={logo}
            alt='logo'
            className='w-[250px] h-[70px] flex justify-center items-center ml-2.5'
          />
        </div>
        <div className='w-1/2'>
          <ul className='flex items-center justify-around flex-row'>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-blue-800 transition-all ease-in-out duration-200'>
              <Link to='/'>Inicio</Link>
            </li>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-blue-800 transition-all ease-in-out duration-200'>
              <Link to='/servicios'>Servicios</Link>
            </li>
            <li className='list-none text-xl font-bold text-gray-600 hover:text-blue-800 transition-all ease-in-out duration-200'>
              <Link to='/quienesSomos'>Quienes Somos</Link>
            </li>
            <li className='list-none text-xl font-bold py-1 px-4 rounded-full text-white bg-[#002B50] hover:bg-blue-900 transition-all ease-in-out duration-200'>
              <Link to='/register' className='text-white'>
                Hazte Cliente
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Sección principal de servicios */}
      <div className='py-12 px-5 text-center bg-gray-100 min-h-screen'>
        <h1 className='text-4xl mb-10 text-[#002b5b]'>Nuestros Servicios</h1>

        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className='bg-white mx-auto p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full max-w-md'
            >
              <h2 className='text-xl font-semibold mb-3 text-[#1c6e4c]'>
                {servicio.title}
              </h2>
              <p className='text-gray-600 mb-5'>{servicio.desc}</p>
              <button
                className='px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
                onClick={() => alert(`${servicio.cta} - Acción demo`)}
              >
                {servicio.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección destacada: Simuladores */}
      <section className='bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-12 mt-8'>
        <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div>
            <h2 className='text-2xl md:text-3xl font-extrabold'>
              Simuladores financieros
            </h2>
            <p className='mt-2 text-sky-100 max-w-xl'>
              Calcula interés simple, interés compuesto y anualidades. Rápido,
              claro y seguro.
            </p>
          </div>

          <div className='flex gap-3 flex-wrap'>
            <button className='px-4 py-2 rounded-lg bg-white text-sky-700 hover:bg-slate-100'>
              Interés simple
            </button>
            <button className='px-4 py-2 rounded-lg bg-white text-sky-700 hover:bg-slate-100'>
              Interés compuesto
            </button>
            <button className='px-4 py-2 rounded-lg bg-white text-sky-700 hover:bg-slate-100'>
              Anualidades
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='mt-12 bg-white border-t border-slate-100'>
        <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-slate-500'>
            © {new Date().getFullYear()} Financiera — Todos los derechos
            reservados
          </p>
          <nav className='flex gap-4 text-sm text-slate-600'>
            <a href='#' className='hover:underline'>
              Privacidad
            </a>
            <a href='#' className='hover:underline'>
              Términos
            </a>
            <a href='#' className='hover:underline'>
              Ayuda
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
