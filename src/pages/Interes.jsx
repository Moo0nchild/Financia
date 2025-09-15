import { useState } from 'react'
import { calcularInteres } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function Interes() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState(true)

  // estados para inputs
  const [interes, setInteres] = useState('')
  const [periodos, setPeriodos] = useState('')
  const [montoFinal, setMontoFinal] = useState('')
  const [montoInicial, setMontoInicial] = useState('')
  const [totalPeriodos, setTotalPeriodos] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteres.calcularTea(
      parseFloat(interes),
      parseFloat(periodos)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitRendimiento(e) {
    e.preventDefault()
    const resultadoCalculoRendimiento =
      calcularInteres.calcularInteresRendimiento(
        parseFloat(montoFinal),
        parseFloat(montoInicial),
        parseFloat(totalPeriodos)
      )
    setResultado(resultadoCalculoRendimiento)
  }

  function handleSelectChange(e) {
    const value = e.target.value === 'true'
    setOpcion(value)
    setResultado(null)

    // limpiar todos los inputs
    setInteres('')
    setPeriodos('')
    setMontoFinal('')
    setMontoInicial('')
    setTotalPeriodos('')
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Interés
            </h1>
            <p className='text-gray-600'>
              Herramienta para calcular tasas de interés efectivas
            </p>
          </div>

          {/* Selector de modo */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <label
              htmlFor='mode-select'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Selecciona el tipo de cálculo:
            </label>
            <select
              id='mode-select'
              onChange={handleSelectChange}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
            >
              <option value='true'>Según la tasa efectiva anual (TEA)</option>
              <option value='false'>
                Según la tasa de rendimiento geométrica (TRG)
              </option>
            </select>
          </div>

          {opcion ? (
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              {/* Header TEA */}
              <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
                <h2 className='text-2xl font-semibold mb-2'>
                  Tasa Efectiva Anual (TEA)
                </h2>
                <p className='opacity-90'>
                  Calcula el porcentaje de crecimiento real de tu dinero en un
                  año, considerando el efecto del interés compuesto
                </p>
              </div>

              <div className='p-6'>
                {/* Fórmula */}
                <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                  <p className='text-sm font-medium text-indigo-800 mb-1'>
                    Fórmula:
                  </p>
                  <code className='text-indigo-700 font-mono'>
                    TEA = (1 + Tasa Periódica)^n - 1
                  </code>
                </div>

                {/* Formulario */}
                <form onSubmit={onSubmit} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='interes'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Tasa de Interés Nominal Anual (decimal):
                      </label>
                      <input
                        type='number'
                        id='interes'
                        name='interes'
                        step='0.01'
                        value={interes}
                        onChange={(e) => setInteres(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Ej: 0.12'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='periodos'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Número de periodos:
                      </label>
                      <input
                        type='number'
                        id='periodos'
                        name='periodos'
                        value={periodos}
                        onChange={(e) => setPeriodos(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Ej: 12'
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Calcular TEA
                  </button>
                </form>

                {/* Resultado */}
                {resultado !== null && (
                  <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-green-800 font-medium'>Resultado:</p>
                    <div className='text-2xl font-bold text-green-700 mt-1'>
                      {resultado.toFixed(2)}%
                    </div>
                    <p className='text-sm text-green-600 mt-1'>
                      Tasa Efectiva Anual calculada
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              {/* Header TRG */}
              <div className='bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white'>
                <h2 className='text-2xl font-semibold mb-2'>
                  Tasa de Rendimiento Geométrica (TRG)
                </h2>
                <p className='opacity-90'>
                  Calcula la tasa de interés que se aplica a cada período de
                  capitalización
                </p>
              </div>

              <div className='p-6'>
                {/* Fórmula */}
                <div className='bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6'>
                  <p className='text-sm font-medium text-purple-800 mb-1'>
                    Fórmula:
                  </p>
                  <code className='text-purple-700 font-mono'>
                    Tasa Periódica = Tasa Nominal Anual / Número de períodos al
                    año
                  </code>
                </div>

                {/* Formulario */}
                <form onSubmit={onSubmitRendimiento} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='montoFinal'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Monto Final:
                      </label>
                      <input
                        type='number'
                        id='montoFinal'
                        name='montoFinal'
                        step='0.01'
                        value={montoFinal}
                        onChange={(e) => setMontoFinal(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Ej: 1500.00'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='montoInicial'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Monto Inicial:
                      </label>
                      <input
                        type='number'
                        id='montoInicial'
                        name='montoInicial'
                        step='0.01'
                        value={montoInicial}
                        onChange={(e) => setMontoInicial(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Ej: 1000.00'
                      />
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='totalPeriodos'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Número total de periodos:
                      </label>
                      <input
                        type='number'
                        id='totalPeriodos'
                        name='totalPeriodos'
                        value={totalPeriodos}
                        onChange={(e) => setTotalPeriodos(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='Ej: 12'
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                  >
                    Calcular TRG
                  </button>
                </form>

                {/* Resultado */}
                {resultado !== null && (
                  <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-green-800 font-medium'>Resultado:</p>
                    <div className='text-2xl font-bold text-green-700 mt-1'>
                      {resultado.toFixed(2)}%
                    </div>
                    <p className='text-sm text-green-600 mt-1'>
                      Tasa de Rendimiento Geométrica calculada
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
