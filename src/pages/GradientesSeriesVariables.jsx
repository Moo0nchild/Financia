import { useState } from 'react'
import { calcularGradientes } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function GradientesSeriesVariables() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState('vp-aritmetico')
  const [tipoGradiente, setTipoGradiente] = useState('aritmetico')
  const [A, setA] = useState('') // Primera cuota
  const [G, setG] = useState('') // Gradiente aritmético
  const [g, setg] = useState('') // Tasa crecimiento geométrico (%)
  const [i, setI] = useState('') // Tasa de interés (%)
  const [n, setN] = useState('') // Número de periodos
  const [VP, setVP] = useState('') // Valor presente
  const [VF, setVF] = useState('') // Valor futuro

  // Función para formatear números en formato de pesos colombianos
  const formatoPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  // Función para formatear porcentajes
  const formatoPorcentaje = (valor) => {
    return `${parseFloat(valor).toFixed(2)}%`
  }

  // Configuración de cada opción
  const opcionesConfig = {
    // GRADIENTE ARITMÉTICO
    'vp-aritmetico': {
      titulo: 'Valor Presente - Gradiente Aritmético',
      descripcion:
        'Calcula el valor presente de una serie con incrementos constantes en cada periodo.',
      formula:
        'VP = A × [(1 - (1+i)^-n)/i] + G × [((1 - (1+i)^-n)/i²) - (n × (1+i)^-n)/i]',
      onSubmit: onSubmitVPAritmetico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor presente calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    'vf-aritmetico': {
      titulo: 'Valor Futuro - Gradiente Aritmético',
      descripcion:
        'Calcula el valor futuro de una serie con incrementos constantes en cada periodo.',
      formula: 'VF = VP × (1+i)^n',
      onSubmit: onSubmitVFAritmetico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    'A-desde-vp-aritmetico': {
      titulo: 'Primera Cuota (A) - Gradiente Aritmético',
      descripcion:
        'Calcula la primera cuota dado el valor presente, gradiente, tasa y periodos.',
      formula: 'A = [VP - factorG] × [i / (1 - (1+i)^-n)]',
      onSubmit: onSubmitADesdeVPAritmetico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      unidadResultado: '$',
      esMonetario: true,
    },

    // GRADIENTE GEOMÉTRICO
    'vp-geometrico': {
      titulo: 'Valor Presente - Gradiente Geométrico',
      descripcion:
        'Calcula el valor presente de una serie con incrementos porcentuales constantes.',
      formula: 'VP = A × [1 - ((1+g)/(1+i))^n] / (i - g)',
      onSubmit: onSubmitVPGeometrico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento (g):',
          value: g,
          onChange: setg,
          unidad: '%',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor presente calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    'vf-geometrico': {
      titulo: 'Valor Futuro - Gradiente Geométrico',
      descripcion:
        'Calcula el valor futuro de una serie con incrementos porcentuales constantes.',
      formula: 'VF = VP × (1+i)^n',
      onSubmit: onSubmitVFGeometrico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento (g):',
          value: g,
          onChange: setg,
          unidad: '%',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    'A-desde-vp-geometrico': {
      titulo: 'Primera Cuota (A) - Gradiente Geométrico',
      descripcion:
        'Calcula la primera cuota dado el valor presente, tasa de crecimiento, tasa de interés y periodos.',
      formula: 'A = VP × (i - g) / [1 - ((1+g)/(1+i))^n]',
      onSubmit: onSubmitADesdeVPGeometrico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento (g):',
          value: g,
          onChange: setg,
          unidad: '%',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      unidadResultado: '$',
      esMonetario: true,
    },
  }

  // Funciones de cálculo
  function onSubmitVPAritmetico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const resultadoCalculo = calcularGradientes.valorPresenteAritmetico(
      parseFloat(A),
      parseFloat(G),
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitVFAritmetico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const resultadoCalculo = calcularGradientes.valorFuturoAritmetico(
      parseFloat(A),
      parseFloat(G),
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitADesdeVPAritmetico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const resultadoCalculo = calcularGradientes.calcularADesdeVPAritmetico(
      parseFloat(VP),
      parseFloat(G),
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitVPGeometrico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const crecimientoDecimal = parseFloat(g) / 100
    const resultadoCalculo = calcularGradientes.valorPresenteGeometrico(
      parseFloat(A),
      crecimientoDecimal,
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitVFGeometrico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const crecimientoDecimal = parseFloat(g) / 100
    const resultadoCalculo = calcularGradientes.valorFuturoGeometrico(
      parseFloat(A),
      crecimientoDecimal,
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitADesdeVPGeometrico(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(i) / 100
    const crecimientoDecimal = parseFloat(g) / 100
    const resultadoCalculo = calcularGradientes.calcularADesdeVPGeometrico(
      parseFloat(VP),
      crecimientoDecimal,
      tasaDecimal,
      parseFloat(n)
    )
    setResultado(resultadoCalculo)
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)

    // Limpiar todos los inputs
    setA('')
    setG('')
    setg('')
    setI('')
    setN('')
    setVP('')
    setVF('')
  }

  function handleTipoGradienteChange(e) {
    const value = e.target.value
    setTipoGradiente(value)
    setResultado(null)

    // Cambiar a una opción por defecto según el tipo
    if (value === 'aritmetico') {
      setOpcion('vp-aritmetico')
    } else {
      setOpcion('vp-geometrico')
    }

    // Limpiar todos los inputs
    setA('')
    setG('')
    setg('')
    setI('')
    setN('')
    setVP('')
    setVF('')
  }

  const config = opcionesConfig[opcion]

  // Filtrar opciones según el tipo de gradiente
  const opcionesFiltradas = {
    aritmetico: [
      { value: 'vp-aritmetico', label: 'Valor Presente' },
      { value: 'vf-aritmetico', label: 'Valor Futuro' },
      { value: 'A-desde-vp-aritmetico', label: 'Primera Cuota (A) desde VP' },
    ],
    geometrico: [
      { value: 'vp-geometrico', label: 'Valor Presente' },
      { value: 'vf-geometrico', label: 'Valor Futuro' },
      { value: 'A-desde-vp-geometrico', label: 'Primera Cuota (A) desde VP' },
    ],
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Gradientes y Series Variables
            </h1>
            <p className='text-gray-600'>
              Herramienta para cálculos de series con incrementos aritméticos y
              geométricos
            </p>
          </div>

          {/* Selectores */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Selector de tipo de gradiente */}
              <div>
                <label
                  htmlFor='tipo-gradiente'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tipo de Gradiente:
                </label>
                <select
                  id='tipo-gradiente'
                  onChange={handleTipoGradienteChange}
                  value={tipoGradiente}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='aritmetico'>Gradiente Aritmético</option>
                  <option value='geometrico'>Gradiente Geométrico</option>
                </select>
              </div>

              {/* Selector de cálculo específico */}
              <div>
                <label
                  htmlFor='calculo-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tipo de Cálculo:
                </label>
                <select
                  id='calculo-select'
                  onChange={handleSelectChange}
                  value={opcion}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  {opcionesFiltradas[tipoGradiente].map((opcionItem) => (
                    <option key={opcionItem.value} value={opcionItem.value}>
                      {opcionItem.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                <code className='text-indigo-700 font-mono text-sm'>
                  {config.formula}
                </code>
              </div>

              {/* Formulario */}
              <form onSubmit={config.onSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {config.campos.map((campo) => (
                    <div key={campo.id}>
                      <label
                        htmlFor={campo.id}
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        {campo.label}
                      </label>
                      <div className='relative'>
                        <input
                          type='number'
                          id={campo.id}
                          name={campo.id}
                          step='0.01'
                          value={campo.value}
                          onChange={(e) => campo.onChange(e.target.value)}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12'
                          placeholder='0'
                          required
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <span className='text-gray-500'>{campo.unidad}</span>
                        </div>
                      </div>
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
                    {config.esMonetario
                      ? formatoPesos(resultado)
                      : `${resultado.toFixed(2)}${config.unidadResultado}`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información adicional */}
          <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              ¿Qué son los gradientes?
            </h3>
            <div className='text-yellow-700 space-y-2'>
              <p>
                <strong>Gradiente Aritmético:</strong> Serie de pagos que
                aumentan o disminuyen en una cantidad constante cada periodo.
                Ejemplo: $100, $120, $140, $160... (G = $20)
              </p>
              <p>
                <strong>Gradiente Geométrico:</strong> Serie de pagos que
                aumentan o disminuyen en un porcentaje constante cada periodo.
                Ejemplo: $100, $110, $121, $133.10... (g = 10%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
