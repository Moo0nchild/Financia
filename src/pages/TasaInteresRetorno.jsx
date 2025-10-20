import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'

export function TasaInteresRetorno() {
  const [flujos, setFlujos] = useState([{ periodo: 0, valor: '' }])
  const [tmar, setTmar] = useState('')
  const [resultado, setResultado] = useState(null)

  // Normalizar número
  const parsearNumero = (valor) => parseFloat(valor.toString().replace(',', '.')) || 0

// Calcular VPN normal (ok)
const calcularVPN = (flujos, tasa) => {
  return flujos.reduce(
    (acc, flujo) =>
      acc + parsearNumero(flujo.valor) / Math.pow(1 + tasa, flujo.periodo),
    0
  )
}

// Calcular TIR mediante Newton-Raphson (corregido)
const calcularTIR = (flujos) => {
  let tasa = 0.1 // estimación inicial (10%)
  let iteraciones = 0
  const precision = 1e-7
  const maxIter = 100

  // 🚨 No se divide el flujo inicial entre nada
  const f = (i) =>
    flujos.reduce((acc, flujo) => {
      const valor = parsearNumero(flujo.valor)
      if (flujo.periodo === 0) return acc + valor
      return acc + valor / Math.pow(1 + i, flujo.periodo)
    }, 0)

  const fPrima = (i) =>
    flujos.reduce((acc, flujo) => {
      const valor = parsearNumero(flujo.valor)
      if (flujo.periodo === 0) return acc
      return acc - (flujo.periodo * valor) / Math.pow(1 + i, flujo.periodo + 1)
    }, 0)

  while (iteraciones < maxIter) {
    const fVal = f(tasa)
    const fDeriv = fPrima(tasa)
    if (Math.abs(fDeriv) < precision) break
    const nuevaTasa = tasa - fVal / fDeriv
    if (Math.abs(nuevaTasa - tasa) < precision) return nuevaTasa
    tasa = nuevaTasa
    iteraciones++
  }
  return tasa
}

  const handleAgregarFlujo = () => {
    setFlujos([...flujos, { periodo: flujos.length, valor: '' }])
  }

  const handleEliminarFlujo = (index) => {
    const nuevos = flujos.filter((_, i) => i !== index)
    setFlujos(nuevos.map((f, idx) => ({ ...f, periodo: idx })))
  }

  const handleCambioFlujo = (index, valor) => {
    const nuevos = [...flujos]
    nuevos[index].valor = valor
    setFlujos(nuevos)
  }

const handleSubmit = (e) => {
  e.preventDefault()
  if (flujos.length < 2) return

  const tir = calcularTIR(flujos)
  const tmarNum = parsearNumero(tmar) / 100
  const vpn = calcularVPN(flujos, tmarNum)
  const rentable = tir > tmarNum

  setResultado({
    tir: tir * 100,
    vpn,
    rentable,
  })
}   

  const formatoPesos = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor)

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Tasa Interna de Retorno (TIR)
            </h1>
            <p className='text-gray-600'>
              Agrega tus flujos de caja y evalúa la rentabilidad de tu proyecto.
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>Flujos de Caja</h2>
              <p className='text-sm opacity-90'>
                Ingresa los valores de inversión inicial y retornos futuros.
              </p>
            </div>

            <div className='p-6'>
              <form onSubmit={handleSubmit} className='space-y-6'>

                {/* Tabla de flujos */}
                <div className='overflow-x-auto'>
                  <table className='min-w-full border border-gray-200 rounded-lg'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th className='px-4 py-2 text-left text-gray-700 font-medium'>Periodo</th>
                        <th className='px-4 py-2 text-left text-gray-700 font-medium'>Flujo de Caja (COP)</th>
                        <th className='px-4 py-2'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {flujos.map((flujo, index) => (
                        <tr key={index} className='border-t'>
                          <td className='px-4 py-2 font-semibold text-gray-700'>Año {flujo.periodo}</td>
                          <td className='px-4 py-2'>
                            <input
                              type='text'
                              value={flujo.valor}
                              onChange={(e) => handleCambioFlujo(index, e.target.value)}
                              className='w-full border border-gray-300 rounded-lg p-2 text-gray-800'
                              placeholder='Ej: -5000000 o 1200000'
                            />
                          </td>
                          <td className='px-4 py-2 text-right'>
                            {index > 0 && (
                              <button
                                type='button'
                                onClick={() => handleEliminarFlujo(index)}
                                className='text-red-500 hover:text-red-700 font-semibold'
                              >
                                Eliminar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Botón agregar flujo */}
                <div className='text-center'>
                  <button
                    type='button'
                    onClick={handleAgregarFlujo}
                    className='bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-colors'
                  >
                    + Agregar flujo
                  </button>
                </div>

                {/* TMAR */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Tasa mínima aceptable de retorno (TMAR) %
                  </label>
                  <input
                    type='text'
                    value={tmar}
                    onChange={(e) => setTmar(e.target.value)}
                    className='w-full p-3 border rounded-lg'
                    placeholder='Ej: 12'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors'
                >
                  Calcular TIR
                </button>
              </form>

              {resultado && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium mb-2'>Resultado:</p>
                  <div className='text-2xl font-bold text-green-700'>
                    TIR: {resultado.tir.toFixed(2)}%
                  </div>
                  <div className='text-gray-700 mt-1'>
                    VPN (a TMAR {tmar}%): {formatoPesos(resultado.vpn)}
                  </div>
                  <div
                    className={`mt-3 text-lg font-semibold ${
                      resultado.rentable ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {resultado.rentable
                      ? '✅ Proyecto rentable (TIR > TMAR)'
                      : '❌ Proyecto no rentable (TIR < TMAR)'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info extra */}
          <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-blue-800 mb-2'>
              Información rápida:
            </h3>
            <ul className='list-disc list-inside text-blue-700 space-y-2'>
              <li>
                La <strong>TIR</strong> es la tasa de descuento que hace que el VPN sea igual a cero.
              </li>
              <li>
                Si la <strong>TIR</strong> es mayor que la <strong>TMAR</strong>, el proyecto es
                rentable.
              </li>
              <li>
                Ingresa el flujo inicial negativo (inversión) y los ingresos positivos por periodo.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
