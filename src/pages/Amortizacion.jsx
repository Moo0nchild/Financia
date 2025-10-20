import { useState } from 'react'
import { sistemasAmortizacion } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function Amortizacion() {
  const [resultado, setResultado] = useState(null)
  const [tablaAmortizacion, setTablaAmortizacion] = useState([])
  const [opcion, setOpcion] = useState('frances')
  const [sistema, setSistema] = useState('frances')
  const [VP, setVP] = useState('')
  const [i, setI] = useState('')
  const [n, setN] = useState('')
  const [cuota, setCuota] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [periodoAmortizacion, setPeriodoAmortizacion] = useState('mensual')

  const normalizarNumero = (valor) => {
    if (!valor) return ''
    return valor.toString().replace(',', '.')
  }

  const parsearNumero = (valor) => {
    const normalizado = normalizarNumero(valor)
    return parseFloat(normalizado)
  }

  const ajustarTasaSegunPeriodo = (tasaPorcentual, periodo) => {
    const tasaDecimal = tasaPorcentual / 100

    if (periodo === 'anual') {
      return tasaDecimal
    }

    const conversiones = {
      mensual: tasaDecimal / 12,
      trimestral: tasaDecimal / 4,
      semestral: tasaDecimal / 2,
      diaria: tasaDecimal / 365,
    }

    return conversiones[periodo] || tasaDecimal
  }

  const formatoPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  const calcularTotales = (tabla) => {
    const totalCuota = tabla.reduce((sum, fila) => sum + fila.cuota, 0)
    const totalInteres = tabla.reduce((sum, fila) => sum + fila.interes, 0)
    const totalCapital = tabla.reduce((sum, fila) => sum + fila.capital, 0)

    return {
      totalCuota: Number(totalCuota.toFixed(2)),
      totalInteres: Number(totalInteres.toFixed(2)),
      totalCapital: Number(totalCapital.toFixed(2)),
    }
  }

  const calcularAmortizacionConstante = (VP, n) => {
    return VP / n
  }

  const opcionesConfig = {
    frances: {
      titulo: 'Sistema Francés - Cuota Constante',
      descripcion:
        'Calcula la cuota constante y genera la tabla de amortización del sistema francés.',
      formula: 'Cuota = VP × [i(1+i)^n] / [(1+i)^n - 1]',
      onSubmit: onSubmitFrances,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés anual:',
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
      textoResultado: 'La cuota constante calculada es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    aleman: {
      titulo: 'Sistema Alemán - Amortización Constante',
      descripcion:
        'Calcula las cuotas decrecientes y genera la tabla de amortización del sistema alemán.',
      formula: 'Amortización Constante = VP / n',
      onSubmit: onSubmitAleman,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés anual:',
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
      textoResultado: 'Tabla de amortización generada:',
      esMonetario: false,
    },
    'aleman-periodo': {
      titulo: 'Sistema Alemán - Cuota por Periodo',
      descripcion:
        'Calcula la cuota para un periodo específico en el sistema alemán.',
      formula: 'Cuota = Amortización Constante + Interés del periodo',
      onSubmit: onSubmitAlemanPeriodo,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés anual:',
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
        {
          id: 'periodo',
          label: 'Periodo a calcular:',
          value: periodo,
          onChange: setPeriodo,
          unidad: '',
        },
      ],
      textoResultado: 'La cuota para el periodo seleccionado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    americano: {
      titulo: 'Sistema Americano',
      descripcion:
        'Calcula las cuotas de intereses y el pago final del sistema americano.',
      formula: 'Cuota = VP × i (periodos 1 a n-1), Cuota final = VP × (1 + i)',
      onSubmit: onSubmitAmericano,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés anual:',
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
      textoResultado: 'Tabla de amortización generada:',
      esMonetario: false,
    },
    'calcular-tasa': {
      titulo: 'Calcular Tasa de Interés',
      descripcion:
        'Calcula la tasa de interés implícita dado el valor del préstamo, cuota y número de periodos.',
      formula:
        'Método numérico para resolver: Cuota = VP × [i(1+i)^n] / [(1+i)^n - 1]',
      onSubmit: onSubmitCalcularTasa,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'cuota',
          label: 'Cuota constante:',
          value: cuota,
          onChange: setCuota,
          unidad: '$',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La tasa de interés anual calculada es:',
      unidadResultado: '%',
      esMonetario: false,
    },
    'calcular-periodos': {
      titulo: 'Calcular Número de Periodos',
      descripcion:
        'Calcula el número de periodos necesario para pagar un préstamo dada la cuota y tasa.',
      formula: 'n = log(Cuota / (Cuota - VP × i)) / log(1 + i)',
      onSubmit: onSubmitCalcularPeriodos,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'cuota',
          label: 'Cuota constante:',
          value: cuota,
          onChange: setCuota,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés anual:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
      ],
      textoResultado: 'El número de periodos calculado es:',
      unidadResultado: ' periodos',
      esMonetario: false,
    },
  }

  function onSubmitFrances(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoAmortizacion
    )
    const resultadoCalculo = sistemasAmortizacion.sistemaFrances.calcularCuota(
      parsearNumero(VP),
      tasaAjustada,
      parsearNumero(n),
      periodoAmortizacion
    )
    setResultado(resultadoCalculo)
    const tabla = sistemasAmortizacion.sistemaFrances.generarTablaAmortizacion(
      parsearNumero(VP),
      tasaAjustada,
      parsearNumero(n),
      periodoAmortizacion
    )
    setTablaAmortizacion(tabla)
  }

  function onSubmitAleman(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoAmortizacion
    )
    const tabla = sistemasAmortizacion.sistemaAleman.generarTablaAmortizacion(
      parsearNumero(VP),
      tasaAjustada,
      parsearNumero(n),
      periodoAmortizacion
    )
    setTablaAmortizacion(tabla)
    setResultado(tabla.length)
  }

  function onSubmitAlemanPeriodo(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoAmortizacion
    )
    const resultadoCalculo =
      sistemasAmortizacion.sistemaAleman.calcularCuotaPeriodo(
        parsearNumero(VP),
        tasaAjustada,
        parsearNumero(n),
        parsearNumero(periodo),
        periodoAmortizacion
      )
    setResultado(resultadoCalculo)
    setTablaAmortizacion([])
  }

  function onSubmitAmericano(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoAmortizacion
    )
    const tabla =
      sistemasAmortizacion.sistemaAmericano.generarTablaAmortizacion(
        parsearNumero(VP),
        tasaAjustada,
        parsearNumero(n),
        periodoAmortizacion
      )
    setTablaAmortizacion(tabla)
    setResultado(tabla.length)
  }

  function onSubmitCalcularTasa(e) {
    e.preventDefault()
    const resultadoCalculo = sistemasAmortizacion.calcularTasaDesdeCuota(
      parsearNumero(VP),
      parsearNumero(cuota),
      parsearNumero(n),
      periodoAmortizacion
    )
    const tasaAnual =
      resultadoCalculo *
      (periodoAmortizacion === 'mensual'
        ? 12
        : periodoAmortizacion === 'trimestral'
        ? 4
        : periodoAmortizacion === 'semestral'
        ? 2
        : periodoAmortizacion === 'diaria'
        ? 365
        : 1) *
      100
    setResultado(tasaAnual)
    setTablaAmortizacion([])
  }

  function onSubmitCalcularPeriodos(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoAmortizacion
    )
    const resultadoCalculo = sistemasAmortizacion.calcularPeriodosDesdeCuota(
      parsearNumero(VP),
      parsearNumero(cuota),
      tasaAjustada,
      periodoAmortizacion
    )
    setResultado(Math.ceil(resultadoCalculo))
    setTablaAmortizacion([])
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)
    setTablaAmortizacion([])
    setVP('')
    setI('')
    setN('')
    setCuota('')
    setPeriodo('')
  }

  function handleSistemaChange(e) {
    const value = e.target.value
    setSistema(value)
    setResultado(null)
    setTablaAmortizacion([])

    if (value === 'frances') {
      setOpcion('frances')
    } else if (value === 'aleman') {
      setOpcion('aleman')
    } else if (value === 'americano') {
      setOpcion('americano')
    } else {
      setOpcion('calcular-tasa')
    }

    setVP('')
    setI('')
    setN('')
    setCuota('')
    setPeriodo('')
  }

  const config = opcionesConfig[opcion]
  const totales =
    tablaAmortizacion.length > 0 ? calcularTotales(tablaAmortizacion) : null
  const amortizacionConstante =
    sistema === 'aleman' && VP && n
      ? calcularAmortizacionConstante(parsearNumero(VP), parsearNumero(n))
      : 0

  const opcionesFiltradas = {
    frances: [{ value: 'frances', label: 'Calcular Cuota y Tabla' }],
    aleman: [
      { value: 'aleman', label: 'Generar Tabla Completa' },
      { value: 'aleman-periodo', label: 'Calcular Cuota por Periodo' },
    ],
    americano: [{ value: 'americano', label: 'Generar Tabla Completa' }],
    general: [
      { value: 'calcular-tasa', label: 'Calcular Tasa' },
      { value: 'calcular-periodos', label: 'Calcular Periodos' },
    ],
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Sistemas de Amortización
            </h1>
            <p className='text-gray-600'>
              Herramienta para diferentes sistemas de amortización de préstamos
            </p>
          </div>

          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label
                  htmlFor='sistema-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Sistema de Amortización:
                </label>
                <select
                  id='sistema-select'
                  onChange={handleSistemaChange}
                  value={sistema}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='frances'>Sistema Francés</option>
                  <option value='aleman'>Sistema Alemán</option>
                  <option value='americano'>Sistema Americano</option>
                  <option value='general'>Cálculos Generales</option>
                </select>
              </div>

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
                  {opcionesFiltradas[sistema].map((opcionItem) => (
                    <option key={opcionItem.value} value={opcionItem.value}>
                      {opcionItem.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor='periodo-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Periodo de Amortización:
                </label>
                <select
                  id='periodo-select'
                  onChange={(e) => setPeriodoAmortizacion(e.target.value)}
                  value={periodoAmortizacion}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='mensual'>Mensual</option>
                  <option value='trimestral'>Trimestral</option>
                  <option value='semestral'>Semestral</option>
                  <option value='anual'>Anual</option>
                  <option value='diaria'>Diaria</option>
                </select>
              </div>
            </div>

            <div className='mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg'>
              <p className='text-indigo-700 text-sm'>
                <strong>Periodo seleccionado:</strong>{' '}
                {periodoAmortizacion.charAt(0).toUpperCase() +
                  periodoAmortizacion.slice(1)}
                {i && (
                  <span className='ml-2'>
                    • Tasa {periodoAmortizacion}:{' '}
                    {(
                      ajustarTasaSegunPeriodo(
                        parsearNumero(i),
                        periodoAmortizacion
                      ) * 100
                    ).toFixed(4)}
                    %
                  </span>
                )}
              </p>
            </div>

            {sistema === 'aleman' && VP && n && (
              <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='flex justify-between items-center'>
                  <span className='text-blue-800 font-medium'>
                    Amortización Constante ({periodoAmortizacion}):
                  </span>
                  <span className='text-xl font-bold text-blue-700'>
                    {formatoPesos(amortizacionConstante)}
                  </span>
                </div>
                <p className='text-blue-600 text-sm mt-1'>
                  Esta es la cantidad fija de capital que se paga cada periodo{' '}
                  {periodoAmortizacion}
                </p>
              </div>
            )}
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
              <div className='mt-2 bg-purple-500 bg-opacity-20 p-2 rounded'>
                <p className='text-sm'>
                  <strong>Periodo:</strong>{' '}
                  {periodoAmortizacion.charAt(0).toUpperCase() +
                    periodoAmortizacion.slice(1)}
                </p>
              </div>
            </div>

            <div className='p-6'>
              <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                <p className='text-sm font-medium text-indigo-800 mb-1'>
                  Fórmula:
                </p>
                <code className='text-indigo-700 font-mono text-sm'>
                  {config.formula}
                </code>
              </div>

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
                          type='text'
                          id={campo.id}
                          name={campo.id}
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

              {resultado !== null &&
                !['frances', 'aleman', 'americano'].includes(opcion) && (
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

              {resultado !== null && opcion === 'frances' && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>
                    {config.textoResultado}
                  </p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {formatoPesos(resultado)}
                  </div>
                  <p className='text-green-600 text-sm mt-2'>
                    Cuota {periodoAmortizacion} constante durante {n} periodos
                  </p>
                </div>
              )}

              {resultado !== null && opcion === 'aleman-periodo' && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>
                    {config.textoResultado}
                  </p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {formatoPesos(resultado)}
                  </div>
                  <div className='mt-2 text-green-700'>
                    <p>Desglose del periodo {periodo}:</p>
                    <div className='flex justify-between mt-1'>
                      <span>Amortización constante:</span>
                      <span>{formatoPesos(amortizacionConstante)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Interés del periodo:</span>
                      <span>
                        {formatoPesos(resultado - amortizacionConstante)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {tablaAmortizacion.length > 0 && (
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white'>
                <h2 className='text-2xl font-semibold mb-2'>
                  Tabla de Amortización - Periodo{' '}
                  {periodoAmortizacion.charAt(0).toUpperCase() +
                    periodoAmortizacion.slice(1)}
                </h2>
                <p className='opacity-90'>
                  Detalle de pagos, intereses, capital y saldos por periodo
                </p>
                {sistema === 'aleman' && (
                  <div className='mt-2 bg-teal-500 bg-opacity-20 p-2 rounded'>
                    <p className='text-sm'>
                      <strong>Amortización Constante:</strong>{' '}
                      {formatoPesos(amortizacionConstante)} por periodo{' '}
                      {periodoAmortizacion}
                    </p>
                  </div>
                )}
              </div>

              <div className='p-6 overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Periodo
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Cuota ({periodoAmortizacion})
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Interés
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Capital
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaAmortizacion.map((fila) => (
                      <tr
                        key={fila.periodo}
                        className='border-b hover:bg-gray-50'
                      >
                        <td className='px-4 py-3'>{fila.periodo}</td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.cuota)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.interes)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.capital)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.saldo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {totales && (
                    <tfoot className='bg-blue-50 font-semibold'>
                      <tr>
                        <td className='px-4 py-3 text-blue-800'>TOTALES</td>
                        <td className='px-4 py-3 text-blue-800'>
                          {formatoPesos(totales.totalCuota)}
                        </td>
                        <td className='px-4 py-3 text-blue-800'>
                          {formatoPesos(totales.totalInteres)}
                        </td>
                        <td className='px-4 py-3 text-blue-800'>
                          {formatoPesos(totales.totalCapital)}
                        </td>
                        <td className='px-4 py-3 text-blue-800'>-</td>
                      </tr>
                      <tr>
                        <td className='px-4 py-3 text-blue-800' colSpan='5'>
                          <div className='flex justify-between'>
                            <span>Préstamo inicial:</span>
                            <span>{formatoPesos(parsearNumero(VP))}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Interés total pagado:</span>
                            <span>{formatoPesos(totales.totalInteres)}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Total pagado:</span>
                            <span>{formatoPesos(totales.totalCuota)}</span>
                          </div>
                          {sistema === 'aleman' && (
                            <div className='flex justify-between'>
                              <span>
                                Amortización constante ({periodoAmortizacion}):
                              </span>
                              <span>{formatoPesos(amortizacionConstante)}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          )}

          <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              ¿Qué son los sistemas de amortización?
            </h3>
            <div className='text-yellow-700 space-y-2'>
              <p>
                <strong>Sistema Francés:</strong> Cuotas constantes durante todo
                el plazo. Al inicio se pagan más intereses y menos capital.
              </p>
              <p>
                <strong>Sistema Alemán:</strong> Amortización constante con
                cuotas decrecientes. La parte de capital es fija, los intereses
                disminuyen cada periodo.
              </p>
              <p>
                <strong>Sistema Americano:</strong> Solo se pagan intereses
                periódicamente y el capital completo al final del plazo.
              </p>
              <p className='mt-2 text-yellow-800 font-medium'>
                Periodo actual:{' '}
                {periodoAmortizacion.charAt(0).toUpperCase() +
                  periodoAmortizacion.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
