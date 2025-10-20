import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'

export function SistemasCapitalizacion() {
  const [resultado, setResultado] = useState(null)
  const [tipoSistema, setTipoSistema] = useState('compuesta')
  const [opcion, setOpcion] = useState('vf-compuesta')
  const [VP, setVP] = useState('')
  const [VF, setVF] = useState('')
  const [i, setI] = useState('')
  const [n, setN] = useState('')
  const [m, setM] = useState('12') // para tasas nominales

  // Normalización de números
  const normalizarNumero = (valor) => valor?.toString().replace(',', '.') || ''
  const parsearNumero = (valor) => parseFloat(normalizarNumero(valor)) || 0

  const formatoPesos = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)

  // ------------------ FUNCIONES DE CÁLCULO ------------------ //

  // CAPITALIZACIÓN SIMPLE
  const formulasSimple = {
    'vf-simple': (VP, i, n) => VP * (1 + i * n),
    'vp-simple': (VF, i, n) => VF / (1 + i * n),
    'i-simple': (VF, VP, n) => (VF / VP - 1) / n,
    'n-simple': (VF, VP, i) => (VF / VP - 1) / i,
  }

  // CAPITALIZACIÓN COMPUESTA
  const formulasCompuesta = {
    'vf-compuesta': (VP, i, n) => VP * Math.pow(1 + i, n),
    'vp-compuesta': (VF, i, n) => VF / Math.pow(1 + i, n),
    'i-compuesta': (VF, VP, n) => Math.pow(VF / VP, 1 / n) - 1,
    'n-compuesta': (VF, VP, i) =>
      Math.log(VF / VP) / Math.log(1 + i),
  }

  // CONVERSIÓN DE TASAS
  const formulasConversion = {
    'efectiva-a-nominal': (ie, m) => ie * m,
    'nominal-a-efectiva': (in_, m) => Math.pow(1 + in_ / m, m) - 1,
    'efectiva-a-efectiva': (ie, m1, m2) =>
      Math.pow(1 + ie, m1 / m2) - 1,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let resultadoFinal = null
    const tasa = parsearNumero(i) / 100
    const VPnum = parsearNumero(VP)
    const VFnum = parsearNumero(VF)
    const nNum = parsearNumero(n)
    const mNum = parsearNumero(m)

    // Capitalización Simple
    if (tipoSistema === 'simple') {
      switch (opcion) {
        case 'vf-simple':
          resultadoFinal = formulasSimple['vf-simple'](VPnum, tasa, nNum)
          break
        case 'vp-simple':
          resultadoFinal = formulasSimple['vp-simple'](VFnum, tasa, nNum)
          break
        case 'i-simple':
          resultadoFinal = formulasSimple['i-simple'](VFnum, VPnum, nNum) * 100
          break
        case 'n-simple':
          resultadoFinal = formulasSimple['n-simple'](VFnum, VPnum, tasa)
          break
        default:
          break
      }
    }

    // Capitalización Compuesta
    if (tipoSistema === 'compuesta') {
      switch (opcion) {
        case 'vf-compuesta':
          resultadoFinal = formulasCompuesta['vf-compuesta'](VPnum, tasa, nNum)
          break
        case 'vp-compuesta':
          resultadoFinal = formulasCompuesta['vp-compuesta'](VFnum, tasa, nNum)
          break
        case 'i-compuesta':
          resultadoFinal =
            formulasCompuesta['i-compuesta'](VFnum, VPnum, nNum) * 100
          break
        case 'n-compuesta':
          resultadoFinal = formulasCompuesta['n-compuesta'](VFnum, VPnum, tasa)
          break
        default:
          break
      }
    }

    // Conversión de tasas
    if (tipoSistema === 'conversion') {
      switch (opcion) {
        case 'efectiva-a-nominal':
          resultadoFinal = formulasConversion['efectiva-a-nominal'](tasa, mNum) * 100
          break
        case 'nominal-a-efectiva':
          resultadoFinal = formulasConversion['nominal-a-efectiva'](tasa, mNum) * 100
          break
        case 'efectiva-a-efectiva':
          resultadoFinal =
            formulasConversion['efectiva-a-efectiva'](tasa, parsearNumero(n), mNum) * 100
          break
        default:
          break
      }
    }

    setResultado(resultadoFinal)
  }

  // ------------------ OPCIONES DE INTERFAZ ------------------ //
  const opcionesFiltradas = {
    simple: [
      { value: 'vf-simple', label: 'Valor Futuro (VF)' },
      { value: 'vp-simple', label: 'Valor Presente (VP)' },
      { value: 'i-simple', label: 'Tasa de Interés (i)' },
      { value: 'n-simple', label: 'Número de Periodos (n)' },
    ],
    compuesta: [
      { value: 'vf-compuesta', label: 'Valor Futuro (VF)' },
      { value: 'vp-compuesta', label: 'Valor Presente (VP)' },
      { value: 'i-compuesta', label: 'Tasa de Interés (i)' },
      { value: 'n-compuesta', label: 'Número de Periodos (n)' },
    ],
    conversion: [
      { value: 'efectiva-a-nominal', label: 'Efectiva → Nominal' },
      { value: 'nominal-a-efectiva', label: 'Nominal → Efectiva' },
      { value: 'efectiva-a-efectiva', label: 'Efectiva → Efectiva (otro periodo)' },
    ],
  }

  const handleTipoChange = (e) => {
    setTipoSistema(e.target.value)
    setOpcion(opcionesFiltradas[e.target.value][0].value)
    setResultado(null)
    setVP('')
    setVF('')
    setI('')
    setN('')
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Sistemas de Capitalización
            </h1>
            <p className='text-gray-600'>
              Realiza cálculos financieros de capitalización simple, compuesta y conversión de tasas
            </p>
          </div>

          {/* Selección de tipo */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tipo de Sistema:
                </label>
                <select
                  onChange={handleTipoChange}
                  value={tipoSistema}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50'
                >
                  <option value='simple'>Capitalización Simple</option>
                  <option value='compuesta'>Capitalización Compuesta</option>
                  <option value='conversion'>Conversión de Tasas</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Cálculo:
                </label>
                <select
                  onChange={(e) => setOpcion(e.target.value)}
                  value={opcion}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50'
                >
                  {opcionesFiltradas[tipoSistema].map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>
                {opcionesFiltradas[tipoSistema].find(o => o.value === opcion)?.label}
              </h2>
            </div>

            <div className='p-6'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {(tipoSistema !== 'conversion') && (
                    <>
                      {(opcion.includes('vf') || opcion.includes('i') || opcion.includes('n')) && (
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>Valor Presente (VP):</label>
                          <input
                            type='text'
                            value={VP}
                            onChange={(e) => setVP(e.target.value)}
                            className='w-full p-3 border rounded-lg'
                            placeholder='0'
                          />
                        </div>
                      )}
                      {(opcion.includes('vp') || opcion.includes('i') || opcion.includes('n')) && (
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>Valor Futuro (VF):</label>
                          <input
                            type='text'
                            value={VF}
                            onChange={(e) => setVF(e.target.value)}
                            className='w-full p-3 border rounded-lg'
                            placeholder='0'
                          />
                        </div>
                      )}
                      {(!opcion.includes('i')) && (
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>Tasa de interés (%):</label>
                          <input
                            type='text'
                            value={i}
                            onChange={(e) => setI(e.target.value)}
                            className='w-full p-3 border rounded-lg'
                            placeholder='0'
                          />
                        </div>
                      )}
                      {(!opcion.includes('n')) && (
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>Número de periodos (n):</label>
                          <input
                            type='text'
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                            className='w-full p-3 border rounded-lg'
                            placeholder='0'
                          />
                        </div>
                      )}
                    </>
                  )}

                  {tipoSistema === 'conversion' && (
                    <>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Tasa (%):</label>
                        <input
                          type='text'
                          value={i}
                          onChange={(e) => setI(e.target.value)}
                          className='w-full p-3 border rounded-lg'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Periodo (m):</label>
                        <input
                          type='text'
                          value={m}
                          onChange={(e) => setM(e.target.value)}
                          className='w-full p-3 border rounded-lg'
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors'
                >
                  Calcular
                </button>
              </form>

              {resultado !== null && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>Resultado:</p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {opcion.includes('vf') || opcion.includes('vp')
                      ? formatoPesos(resultado)
                      : `${resultado.toFixed(4)}${opcion.includes('i') ? '%' : ''}`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info extra */}
          <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              Información rápida:
            </h3>
            <ul className='list-disc list-inside text-yellow-700 space-y-2'>
              <li><strong>Capitalización Simple:</strong> Interés calculado solo sobre el capital inicial.</li>
              <li><strong>Capitalización Compuesta:</strong> Interés calculado sobre capital e intereses acumulados.</li>
              <li><strong>Conversión de Tasas:</strong> Transforma tasas nominales en efectivas y viceversa según el periodo.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
