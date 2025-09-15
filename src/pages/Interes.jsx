import PageWrapper from '../components/PageWrapper'
import { Link } from 'react-router-dom'

export function Interes() {
  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Tasa de Interés
            </h1>
            <p className='text-gray-600'>
              Conoce todo sobre las tasas de interés y su importancia en el
              mundo financiero
            </p>
          </div>

          {/* Contenedor principal */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            {/* Header con gradiente */}
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>
                ¿Qué es la tasa de interés?
              </h2>
            </div>

            <div className='p-6'>
              <div className='prose prose-indigo max-w-none'>
                <p className='text-gray-700 mb-6'>
                  La tasa de interés es el precio del dinero en el tiempo.
                  Representa el porcentaje que se cobra por prestar dinero o el
                  rendimiento que se obtiene por invertir dinero durante un
                  período determinado. Es fundamentalmente el costo de usar
                  capital ajeno o la recompensa por renunciar al uso inmediato
                  del dinero propio.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de ¿Para qué sirve? */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>¿Para qué sirve?</h2>
            </div>

            <div className='p-6'>
              <div className='prose prose-indigo max-w-none'>
                <ul className='list-disc list-inside text-gray-700 space-y-2'>
                  <li>
                    <span className='font-medium'>Asignación de recursos:</span>{' '}
                    Dirigen el capital hacia usos más productivos
                  </li>
                  <li>
                    <span className='font-medium'>Control de inflación:</span>{' '}
                    Tasas altas reducen el gasto y la inflación
                  </li>
                  <li>
                    <span className='font-medium'>Estimulación económica:</span>{' '}
                    Tasas bajas fomentan inversión y consumo
                  </li>
                  <li>
                    <span className='font-medium'>Valoración de activos:</span>{' '}
                    Base para calcular valor presente de flujos futuros
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección de Tipos de tasas de interés */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>
                Tipos de tasas de interés
              </h2>
            </div>

            <div className='p-6'>
              <div className='prose prose-indigo max-w-none space-y-8'>
                {/* Interés Simple */}
                <div className='bg-indigo-50 p-4 rounded-lg'>
                  <h3 className='text-xl font-semibold text-indigo-800 mb-2'>
                    Interés Simple
                  </h3>
                  <p className='text-gray-700 mb-3'>
                    El interés se calcula únicamente sobre el capital inicial y
                    no se reinvierte.
                  </p>
                  <div className='bg-indigo-100 p-3 rounded-md mb-3'>
                    <code className='text-indigo-700 font-mono'>
                      I = C × t × r
                    </code>
                  </div>
                  <p className='text-gray-600 text-sm mb-3'>
                    Donde: I = Interés, C = Capital, t = Tiempo, r = Tasa de
                    Interés
                  </p>
                  <Link
                    to='/interesSimple'
                    className='inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200'
                  >
                    Calcular interés simple
                  </Link>
                </div>

                {/* Interés Compuesto */}
                <div className='bg-purple-50 p-4 rounded-lg'>
                  <h3 className='text-xl font-semibold text-purple-800 mb-2'>
                    Interés Compuesto
                  </h3>
                  <p className='text-gray-700 mb-3'>
                    El interés se calcula sobre el capital inicial más los
                    intereses acumulados de períodos anteriores.
                  </p>
                  <div className='bg-purple-100 p-3 rounded-md mb-3'>
                    <code className='text-purple-700 font-mono'>
                      I = C × (1 + r)^t
                    </code>
                  </div>
                  <p className='text-gray-600 text-sm mb-3'>
                    Donde: I = Interés, C = Capital, t = Tiempo, r = Tasa de
                    Interés
                  </p>
                  <Link
                    to='/interesCompuesto'
                    className='inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200'
                  >
                    Calcular interés compuesto
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Usos prácticos */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>Usos prácticos</h2>
            </div>

            <div className='p-6'>
              <div className='prose prose-indigo max-w-none'>
                <ul className='list-disc list-inside text-gray-700 space-y-2'>
                  <li>Calcular pagos de préstamos hipotecarios</li>
                  <li>Determinar rendimientos de inversiones</li>
                  <li>Evaluar proyectos de inversión</li>
                  <li>Comparar alternativas financieras</li>
                  <li>Planificar el ahorro y la jubilación</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección de Importancia en diferentes sectores */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>
                Importancia en diferentes sectores
              </h2>
            </div>

            <div className='p-6'>
              <div className='prose prose-indigo max-w-none space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Sector bancario:
                  </h3>
                  <ul className='list-disc list-inside text-gray-700 space-y-1 ml-4'>
                    <li>Determina el margen de intermediación</li>
                    <li>Afecta la rentabilidad de los bancos</li>
                    <li>Influye en la demanda de créditos</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Sector empresarial:
                  </h3>
                  <ul className='list-disc list-inside text-gray-700 space-y-1 ml-4'>
                    <li>Costo de financiamiento para proyectos</li>
                    <li>Evaluación de la viabilidad de inversiones</li>
                    <li>Decisiones de estructura de capital</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Sector gubernamental:
                  </h3>
                  <ul className='list-disc list-inside text-gray-700 space-y-1 ml-4'>
                    <li>Costo de la deuda pública</li>
                    <li>Herramienta de política económica</li>
                    <li>Control de variables macroeconómicas</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Personas naturales:
                  </h3>
                  <ul className='list-disc list-inside text-gray-700 space-y-1 ml-4'>
                    <li>Costo de créditos de consumo</li>
                    <li>Rendimiento de ahorros e inversiones</li>
                    <li>Planificación financiera personal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
