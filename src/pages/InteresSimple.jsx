import { useState } from 'react'
import { calcularInteresSimple } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function InteresSimple() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState('general')
  const [capital, setCapital] = useState('')
  const [tasaInteres, setTasaInteres] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [montoTotal, setMontoTotal] = useState('')

  // Configuración de cada opción para evitar repetir código
  const opcionesConfig = {
    general: {
      titulo: 'Fórmula General del Interés Simple',
      descripcion:
        'El interés simple es una herramienta financiera que se usa para calcular cuánto dinero extra se paga o se gana por prestar o invertir un capital durante un tiempo determinado.',
      formula: 'Interés = Capital Inicial × Tasa de Interés × Tiempo',
      onSubmit: onSubmitGeneral,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (decimal):',
          value: tasaInteres,
          onChange: setTasaInteres,
        },
        { id: 'tiempo', label: 'Tiempo:', value: tiempo, onChange: setTiempo },
      ],
      textoResultado: 'El interés simple calculado es:',
      unidadResultado: '%',
    },
    valorFuturo: {
      titulo: 'Valor Futuro (Monto)',
      descripcion:
        'Calcula el monto total futuro considerando el capital inicial más el interés simple generado.',
      formula: 'Monto Final = Capital Inicial × (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitValorFuturo,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (decimal):',
          value: tasaInteres,
          onChange: setTasaInteres,
        },
        { id: 'tiempo', label: 'Tiempo:', value: tiempo, onChange: setTiempo },
      ],
      textoResultado: 'El valor futuro calculado es:',
      unidadResultado: '',
    },
    capital: {
      titulo: 'Capital (Según Monto)',
      descripcion:
        'Calcula cuánto fue el capital invertido o prestado, conociendo el monto final, la tasa y el tiempo.',
      formula: 'Capital = Monto Final / (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitCapital,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (decimal):',
          value: tasaInteres,
          onChange: setTasaInteres,
        },
        { id: 'tiempo', label: 'Tiempo:', value: tiempo, onChange: setTiempo },
      ],
      textoResultado: 'El capital calculado es:',
      unidadResultado: '',
    },
    tasa: {
      titulo: 'Tasa de Interés (Según Monto)',
      descripcion:
        'Calcula qué porcentaje de interés se aplicó, conociendo capital, monto final y tiempo.',
      formula:
        'Tasa de Interés = ((Monto Final / Capital Inicial) - 1) / Tiempo',
      onSubmit: onSubmitTasa,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
        },
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
        },
        { id: 'tiempo', label: 'Tiempo:', value: tiempo, onChange: setTiempo },
      ],
      textoResultado: 'La tasa de interés calculada es:',
      unidadResultado: '%',
    },
    tiempo: {
      titulo: 'Tiempo (Según Monto)',
      descripcion:
        'Calcula cuánto tiempo duró la inversión o el préstamo, conociendo capital, monto final y tasa.',
      formula:
        'Tiempo = ((Monto Final / Capital Inicial) - 1) / Tasa de Interés',
      onSubmit: onSubmitTiempo,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
        },
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (decimal):',
          value: tasaInteres,
          onChange: setTasaInteres,
        },
      ],
      textoResultado: 'El tiempo calculado es:',
      unidadResultado: ' años',
    },
  }

  // Funciones de cálculo
  function onSubmitGeneral(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularInteresSimple(
      parseFloat(capital),
      parseFloat(tasaInteres),
      parseFloat(tiempo)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitValorFuturo(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularValorFuturo(
      parseFloat(capital),
      parseFloat(tasaInteres),
      parseFloat(tiempo)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitCapital(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularCapital(
      parseFloat(montoTotal),
      parseFloat(tasaInteres),
      parseFloat(tiempo)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitTasa(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularTasa(
      parseFloat(capital),
      parseFloat(montoTotal),
      parseFloat(tiempo)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitTiempo(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularTiempo(
      parseFloat(capital),
      parseFloat(montoTotal),
      parseFloat(tasaInteres)
    )
    setResultado(resultadoCalculo)
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)

    // Limpiar todos los inputs
    setCapital('')
    setTasaInteres('')
    setTiempo('')
    setMontoTotal('')
  }

  const config = opcionesConfig[opcion]

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Interés Simple
            </h1>
            <p className='text-gray-600'>
              Herramienta para diferentes cálculos de interés simple
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
              value={opcion}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
            >
              <option value='general'>Fórmula general</option>
              <option value='valorFuturo'>Valor futuro</option>
              <option value='capital'>Capital (según monto)</option>
              <option value='tasa'>Tasa (según monto)</option>
              <option value='tiempo'>Tiempo (según monto)</option>
            </select>
          </div>

          {/* Contenedor principal */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            {/* Header con gradiente */}
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
            </div>

            <div className='p-6'>
              {/* Fórmula */}
              <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                <p className='text-sm font-medium text-indigo-800 mb-1'>
                  Fórmula:
                </p>
                <code className='text-indigo-700 font-mono'>
                  {config.formula}
                </code>
              </div>

              {/* Formulario */}
              <form onSubmit={config.onSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {config.campos.map((campo, index) => (
                    <div
                      key={campo.id}
                      className={
                        config.campos.length > 2 &&
                        index === config.campos.length - 1
                          ? 'md:col-span-2'
                          : ''
                      }
                    >
                      <label
                        htmlFor={campo.id}
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        {campo.label}
                      </label>
                      <input
                        type='number'
                        id={campo.id}
                        name={campo.id}
                        step='0.01'
                        value={campo.value}
                        onChange={(e) => campo.onChange(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        placeholder='0.00'
                        required
                      />
                    </div>
                  ))}
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Calcular
                </button>
              </form>

              {/* Resultado */}
              {resultado !== null && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>
                    {config.textoResultado}
                  </p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {resultado.toFixed(2)}
                    {config.unidadResultado}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
