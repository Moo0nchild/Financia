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

      {/* Grid de servicios */}
      <section className='max-w-7xl mx-auto px-6 py-6 mt-[90px]'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {servicios.map((s) => (
            <div
              key={s.title}
              className='bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col justify-between'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-xl font-semibold'>{s.title}</h3>
                  <p className='mt-2 text-sm text-slate-600'>{s.desc}</p>
                </div>
                <div className='ml-4 hidden md:block'>
                  <div className='h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold'>
                    {s.title.charAt(0)}
                  </div>
                </div>
              </div>

              <div className='mt-6 flex items-center justify-between'>
                <button
                  className='flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  onClick={() => alert(`${s.cta} - Acción demo`)}
                >
                  {s.cta} <ArrowRight size={14} />
                </button>
                <a className='text-xs text-slate-500 cursor-pointer hover:underline'>
                  Más información
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

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
            <a href='#'>Privacidad</a>
            <a href='#'>Términos</a>
            <a href='#'>Ayuda</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
