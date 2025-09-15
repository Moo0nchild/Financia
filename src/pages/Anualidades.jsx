import { useState } from 'react'
import { anualidadesUtils } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function Anualidades() {
  const [opcion, setOpcion] = useState('vf')
  const [pago, setPago] = useState('')
  const [tasa, setTasa] = useState('')
  const [periodos, setPeriodos] = useState('')
  const [valorFinal, setValorFinal] = useState('')
  const [valorPresente, setValorPresente] = useState('')
  const [resultado, setResultado] = useState(null)

  // Configuración de cada opción
  const opcionesConfig = {
    vf: {
      titulo: 'Valor Futuro (Anualidad Ordinaria)',
      descripcion:
        'Calcula el valor futuro de una serie de pagos iguales al final de cada período.',
      campos: [
        { label: 'Pago periódico (A) ($)', value: pago, onChange: setPago },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
    vfAnt: {
      titulo: 'Valor Futuro (Anualidad Anticipada)',
      descripcion:
        'Calcula el valor futuro de una serie de pagos iguales al inicio de cada período.',
      campos: [
        { label: 'Pago periódico (A) ($)', value: pago, onChange: setPago },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
    vp: {
      titulo: 'Valor Presente (Anualidad Ordinaria)',
      descripcion:
        'Calcula el valor presente de una serie de pagos iguales al final de cada período.',
      campos: [
        { label: 'Pago periódico (A) ($)', value: pago, onChange: setPago },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
    vpAnt: {
      titulo: 'Valor Presente (Anualidad Anticipada)',
      descripcion:
        'Calcula el valor presente de una serie de pagos iguales al inicio de cada período.',
      campos: [
        { label: 'Pago periódico (A) ($)', value: pago, onChange: setPago },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
    rentaVF: {
      titulo: 'Renta desde Valor Futuro',
      descripcion:
        'Calcula el pago periódico necesario para alcanzar un valor futuro objetivo.',
      campos: [
        {
          label: 'Valor Futuro (VF) ($)',
          value: valorFinal,
          onChange: setValorFinal,
        },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
    rentaVP: {
      titulo: 'Renta desde Valor Presente',
      descripcion:
        'Calcula el pago periódico equivalente a un valor presente dado.',
      campos: [
        {
          label: 'Valor Presente (VP) ($)',
          value: valorPresente,
          onChange: setValorPresente,
        },
        { label: 'Tasa de interés (%)', value: tasa, onChange: setTasa },
        {
          label: 'Número de periodos (n)',
          value: periodos,
          onChange: setPeriodos,
        },
      ],
    },
  }

  const calcular = () => {
    const A = parseFloat(pago)
    const i = parseFloat(tasa) / 100
    const n = parseInt(periodos)
    const VF = parseFloat(valorFinal)
    const VA = parseFloat(valorPresente)

    let res = null

    switch (opcion) {
      case 'vf':
        res = anualidadesUtils.valorFuturo(A, i, n)
        setResultado(`Valor Futuro (ordinaria): $${res.toFixed(2)}`)
        break
      case 'vfAnt':
        res = anualidadesUtils.valorFuturoAnticipada(A, i, n)
        setResultado(`Valor Futuro (anticipada): $${res.toFixed(2)}`)
        break
      case 'vp':
        res = anualidadesUtils.valorPresente(A, i, n)
        setResultado(`Valor Presente (ordinaria): $${res.toFixed(2)}`)
        break
      case 'vpAnt':
        res = anualidadesUtils.valorPresenteAnticipada(A, i, n)
        setResultado(`Valor Presente (anticipada): $${res.toFixed(2)}`)
        break
      case 'rentaVF':
        res = anualidadesUtils.rentaDesdeVF(VF, i, n)
        setResultado(`Renta (desde VF): $${res.toFixed(2)}`)
        break
      case 'rentaVP':
        res = anualidadesUtils.rentaDesdeVP(VA, i, n)
        setResultado(`Renta (desde VP): $${res.toFixed(2)}`)
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
              Calculadora de Anualidades
            </h1>
            <p className='text-gray-600'>
              Herramienta para cálculos de anualidades ordinarias y anticipadas
            </p>
          </div>

          {/* Selector de tipo de cálculo */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <label
              htmlFor='calculation-type'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              ¿Qué deseas calcular?
            </label>
            <select
              id='calculation-type'
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
            >
              <option value='vf'>Valor Futuro (ordinaria)</option>
              <option value='vfAnt'>Valor Futuro (anticipada)</option>
              <option value='vp'>Valor Presente (ordinaria)</option>
              <option value='vpAnt'>Valor Presente (anticipada)</option>
              <option value='rentaVF'>Renta desde Valor Futuro</option>
              <option value='rentaVP'>Renta desde Valor Presente</option>
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
                  <div key={index}>
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
            <p className='text-sm font-medium text-indigo-800 mb-1'>
              Tipos de Anualidades:
            </p>
            <ul className='text-indigo-700 text-sm list-disc list-inside space-y-1'>
              <li>
                <span className='font-medium'>Ordinaria:</span> Pagos al final
                de cada período
              </li>
              <li>
                <span className='font-medium'>Anticipada:</span> Pagos al inicio
                de cada período
              </li>
              <li>
                <span className='font-medium'>Renta desde VF:</span> Calcula el
                pago necesario para un valor futuro objetivo
              </li>
              <li>
                <span className='font-medium'>Renta desde VP:</span> Calcula el
                pago equivalente a un valor presente
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
