import { useState } from 'react'
import { calcularInteresCompuesto } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function InteresCompuesto() {
  const [opcion, setOpcion] = useState('monto')
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [periodos, setPeriodos] = useState('')
  const [montoFinal, setMontoFinal] = useState('')
  const [unidad, setUnidad] = useState('anual')
  const [resultado, setResultado] = useState(null)

  const frecuencias = {
    diaria: { diasPorPeriodo: 1, label: 'Diaria' },
    mensual: { diasPorPeriodo: 30, label: 'Mensual' },
    trimestral: { diasPorPeriodo: 90, label: 'Trimestral' },
    cuatrimestral: { diasPorPeriodo: 120, label: 'Cuatrimestral' },
    semestral: { diasPorPeriodo: 180, label: 'Semestral' },
    anual: { diasPorPeriodo: 360, label: 'Anual' },
  }

  // Configuración de cada opción
  const opcionesConfig = {
    monto: {
      titulo: 'Cálculo de Monto Compuesto',
      descripcion:
        'Calcula el valor futuro de una inversión considerando el interés compuesto.',
      campos: [
        { label: 'Capital Inicial ($)', value: capital, onChange: setCapital },
        { label: 'Tasa de Interés (%)', value: tasa, onChange: setTasa },
        { label: 'Número de Periodos', value: periodos, onChange: setPeriodos },
      ],
    },
    interes: {
      titulo: 'Cálculo de Interés Compuesto',
      descripcion:
        'Calcula solo el interés generado por la inversión con interés compuesto.',
      campos: [
        { label: 'Capital Inicial ($)', value: capital, onChange: setCapital },
        { label: 'Tasa de Interés (%)', value: tasa, onChange: setTasa },
        { label: 'Número de Periodos', value: periodos, onChange: setPeriodos },
      ],
    },
    capital: {
      titulo: 'Cálculo de Capital Inicial',
      descripcion:
        'Calcula el capital inicial necesario para alcanzar un monto objetivo con interés compuesto.',
      campos: [
        {
          label: 'Monto Final ($)',
          value: montoFinal,
          onChange: setMontoFinal,
        },
        { label: 'Tasa de Interés (%)', value: tasa, onChange: setTasa },
        { label: 'Número de Periodos', value: periodos, onChange: setPeriodos },
      ],
    },
    tasa: {
      titulo: 'Cálculo de Tasa de Interés',
      descripcion:
        'Calcula la tasa de interés necesaria para alcanzar un monto objetivo desde un capital inicial.',
      campos: [
        { label: 'Capital Inicial ($)', value: capital, onChange: setCapital },
        {
          label: 'Monto Final ($)',
          value: montoFinal,
          onChange: setMontoFinal,
        },
        { label: 'Número de Periodos', value: periodos, onChange: setPeriodos },
      ],
    },
    tiempo: {
      titulo: 'Cálculo de Tiempo',
      descripcion:
        'Calcula el tiempo necesario para alcanzar un monto objetivo con interés compuesto.',
      campos: [
        { label: 'Capital Inicial ($)', value: capital, onChange: setCapital },
        {
          label: 'Monto Final ($)',
          value: montoFinal,
          onChange: setMontoFinal,
        },
        { label: 'Tasa de Interés (%)', value: tasa, onChange: setTasa },
      ],
    },
  }

  const calcular = () => {
    const C = parseFloat(capital)
    const MC = parseFloat(montoFinal)
    let i = parseFloat(tasa) / 100
    let n = periodos

    const freq = frecuencias[unidad]
    if (!freq) {
      setResultado('Selecciona una frecuencia válida')
      return
    }

    const diasPeriodo = freq.diasPorPeriodo
    const tasaDiaria = Math.pow(1 + i, 1 / diasPeriodo) - 1
    const totalDias = n * diasPeriodo

    let res = null

    switch (opcion) {
      case 'monto':
        res = calcularInteresCompuesto.calcularMontoCompuesto(
          C,
          tasaDiaria,
          totalDias
        )
        setResultado(`Monto Compuesto: $${res.toFixed(2)}`)
        break

      case 'interes':
        res = calcularInteresCompuesto.calcularInteresCompuesto(
          C,
          tasaDiaria,
          totalDias
        )
        setResultado(`Interés Compuesto: $${res.toFixed(2)}`)
        break

      case 'capital':
        res = calcularInteresCompuesto.calcularCapitalInicial(
          MC,
          tasaDiaria,
          totalDias
        )
        setResultado(`Capital Inicial: $${res.toFixed(2)}`)
        break

      case 'tasa':
        res = calcularInteresCompuesto.calcularTasa(C, MC, totalDias)
        setResultado(`Tasa de Interés: ${(res * 100).toFixed(2)}% ${unidad}`)
        break

      case 'tiempo':
        res = calcularInteresCompuesto.calcularTiempo(C, MC, tasaDiaria)
        setResultado(`Tiempo: ${res.toFixed(2)} días`)
        break

      default:
        setResultado('Selecciona una opción válida')
    }
  }

  const config = opcionesConfig[opcion]

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Interés Compuesto
            </h1>
            <p className='text-gray-600'>
              Herramienta para cálculos avanzados de interés compuesto
            </p>
          </div>

          {/* Selector de tipo de cálculo */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <label
              htmlFor='calculation-type'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Selecciona el tipo de cálculo:
            </label>
            <select
              id='calculation-type'
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
            >
              <option value='monto'>Monto Compuesto</option>
              <option value='interes'>Interés Compuesto</option>
              <option value='capital'>Capital Inicial</option>
              <option value='tasa'>Tasa de Interés</option>
              <option value='tiempo'>Tiempo</option>
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
              {/* Campos del formulario */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                {config.campos.map((campo, index) => (
                  <div
                    key={index}
                    className={
                      config.campos.length > 2 &&
                      index === config.campos.length - 1
                        ? 'md:col-span-2'
                        : ''
                    }
                  >
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {campo.label}
                    </label>
                    <input
                      type='number'
                      step='0.01'
                      value={campo.value}
                      onChange={(e) => campo.onChange(e.target.value)}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                      placeholder='0.00'
                    />
                  </div>
                ))}

                {/* Selector de frecuencia */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Frecuencia de capitalización:
                  </label>
                  <select
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  >
                    {Object.entries(frecuencias).map(([key, freq]) => (
                      <option key={key} value={key}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botón de calcular */}
              <button
                onClick={calcular}
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Calcular
              </button>

              {/* Resultado */}
              {resultado && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>Resultado:</p>
                  <div className='text-xl font-bold text-green-700 mt-1'>
                    {resultado}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información adicional */}
          <div className='mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg'>
            <p className='text-sm font-medium text-indigo-800 mb-1'>Nota:</p>
            <p className='text-indigo-700 text-sm'>
              El interés compuesto calcula intereses sobre el capital inicial
              más los intereses acumulados de periodos anteriores. La frecuencia
              seleccionada afecta cómo se capitalizan los intereses.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

// Componente Input reutilizable (ya no es necesario con el nuevo diseño)
