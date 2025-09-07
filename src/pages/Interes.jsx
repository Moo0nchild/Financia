// import { useState } from 'react'
// import { calcularInteres, calcularInteresRendimiento } from '../lib/data'
// import '../styles/Interes.css'

// export function Interes() {
//   const [resultado, setResultado] = useState(null)
//   const [opcion, setOpcion] = useState(true)

//   // estados para inputs
//   const [interes, setInteres] = useState('')
//   const [periodos, setPeriodos] = useState('')
//   const [montoFinal, setMontoFinal] = useState('')
//   const [montoInicial, setMontoInicial] = useState('')
//   const [totalPeriodos, setTotalPeriodos] = useState('')

//   function onSubmit(e) {
//     e.preventDefault()
//     const resultadoCalculo = calcularInteres(
//       parseFloat(interes),
//       parseFloat(periodos)
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitRendimiento(e) {
//     e.preventDefault()
//     const resultadoCalculoRendimiento = calcularInteresRendimiento(
//       parseFloat(montoFinal),
//       parseFloat(montoInicial),
//       parseFloat(totalPeriodos)
//     )
//     setResultado(resultadoCalculoRendimiento)
//   }

//   function handleSelectChange(e) {
//     const value = e.target.value === 'true'
//     setOpcion(value)
//     setResultado(null)

//     // limpiar todos los inputs
//     setInteres('')
//     setPeriodos('')
//     setMontoFinal('')
//     setMontoInicial('')
//     setTotalPeriodos('')
//   }

//   return (
//     <div>
//       <h1>Cálculo del interés</h1>

//       <select onChange={handleSelectChange}>
//         <option value='true'>Según la tasa efectiva anual</option>
//         <option value='false'>Según la tasa de rendimiento geométrica</option>
//       </select>

//       {opcion ? (
//         <div className='interes-container'>
//           <h1>Tasa efectiva anual</h1>
//           <p>Para calcular el interés se usará la fórmula de la TEA</p>
//           <p>
//             Es el porcentaje de crecimiento real de tu dinero en un año,
//             teniendo en cuenta el efecto del interés compuesto (la
//             capitalización). Es la métrica verdadera para comparar productos
//             financieros.
//           </p>

//           <p>Fórmula: TEA = (1 + Tasa Periódica)^n - 1</p>

//           <form className='interes-form' onSubmit={onSubmit}>
//             <label htmlFor='interes'>
//               Tasa de Interés Nominal Anual (en decimales):
//             </label>
//             <input
//               type='number'
//               id='interes'
//               name='interes'
//               step='0.01'
//               value={interes}
//               onChange={(e) => setInteres(e.target.value)}
//             />

//             <label htmlFor='periodos'>Número de periodos:</label>
//             <input
//               type='number'
//               id='periodos'
//               name='periodos'
//               value={periodos}
//               onChange={(e) => setPeriodos(e.target.value)}
//             />

//             <button type='submit'>Calcular</button>
//           </form>

//           {resultado !== null && (
//             <p>El interés calculado es: {resultado.toFixed(2) + '%'}</p>
//           )}
//         </div>
//       ) : (
//         <div className='interes-container'>
//           <h1>Tasa de rendimiento geométrica</h1>
//           <p>Para calcular el interés se usará la fórmula de la TRG</p>
//           <p>
//             Es la tasa de interés que se aplica a cada período de capitalización
//             (mes, trimestre, día). Es la fracción de la tasa nominal que se usa
//             para calcular los intereses en cada ciclo.
//           </p>
//           <p>
//             Fórmula: Tasa Periódica = Tasa Nominal Anual / Número de períodos al
//             año
//           </p>

//           <form className='interes-form' onSubmit={onSubmitRendimiento}>
//             <label htmlFor='montoFinal'>Monto Final:</label>
//             <input
//               type='number'
//               id='montoFinal'
//               name='montoFinal'
//               step='0.01'
//               value={montoFinal}
//               onChange={(e) => setMontoFinal(e.target.value)}
//             />

//             <label htmlFor='montoInicial'>Monto Inicial:</label>
//             <input
//               type='number'
//               id='montoInicial'
//               name='montoInicial'
//               step='0.01'
//               value={montoInicial}
//               onChange={(e) => setMontoInicial(e.target.value)}
//             />

//             <label htmlFor='totalPeriodos'>Número total de periodos:</label>
//             <input
//               type='number'
//               id='totalPeriodos'
//               name='totalPeriodos'
//               value={totalPeriodos}
//               onChange={(e) => setTotalPeriodos(e.target.value)}
//             />

//             <button type='submit'>Calcular</button>
//           </form>

//           {resultado !== null && (
//             <p>El interés calculado es: {resultado.toFixed(2) + '%'}</p>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

import { useState } from 'react'
import { calcularInteres, calcularInteresRendimiento } from '../lib/data'
import '../styles/Interes.css'

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
    const resultadoCalculo = calcularInteres(
      parseFloat(interes),
      parseFloat(periodos)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitRendimiento(e) {
    e.preventDefault()
    const resultadoCalculoRendimiento = calcularInteresRendimiento(
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
    <div className='interes-main-container'>
      <div className='interes-header'>
        <h1>Cálculo del interés</h1>
      </div>

      <div className='mode-selector'>
        <select onChange={handleSelectChange}>
          <option value='true'>Según la tasa efectiva anual</option>
          <option value='false'>Según la tasa de rendimiento geométrica</option>
        </select>
      </div>

      {opcion ? (
        <div className='interes-container'>
          <h1>Tasa efectiva anual</h1>
          <div className='interes-description'>
            <p>Para calcular el interés se usará la fórmula de la TEA</p>
            <p>
              Es el porcentaje de crecimiento real de tu dinero en un año,
              teniendo en cuenta el efecto del interés compuesto (la
              capitalización). Es la métrica verdadera para comparar productos
              financieros.
            </p>
          </div>

          <div className='formula-box'>
            Fórmula: TEA = (1 + Tasa Periódica)^n - 1
          </div>

          <form className='interes-form' onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='interes'>
                Tasa de Interés Nominal Anual (en decimales):
              </label>
              <input
                type='number'
                id='interes'
                name='interes'
                step='0.01'
                value={interes}
                onChange={(e) => setInteres(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='periodos'>Número de periodos:</label>
              <input
                type='number'
                id='periodos'
                name='periodos'
                value={periodos}
                onChange={(e) => setPeriodos(e.target.value)}
              />
            </div>

            <button type='submit' className='calculate-btn'>
              Calcular
            </button>
          </form>

          {resultado !== null && (
            <div className='result-container'>
              <p className='result-text'>El interés calculado es:</p>
              <span className='result-value'>{resultado.toFixed(2) + '%'}</span>
            </div>
          )}
        </div>
      ) : (
        <div className='interes-container'>
          <h1>Tasa de rendimiento geométrica</h1>
          <div className='interes-description'>
            <p>Para calcular el interés se usará la fórmula de la TRG</p>
            <p>
              Es la tasa de interés que se aplica a cada período de
              capitalización (mes, trimestre, día). Es la fracción de la tasa
              nominal que se usa para calcular los intereses en cada ciclo.
            </p>
          </div>

          <div className='formula-box'>
            Fórmula: Tasa Periódica = Tasa Nominal Anual / Número de períodos al
            año
          </div>

          <form className='interes-form' onSubmit={onSubmitRendimiento}>
            <div className='form-group'>
              <label htmlFor='montoFinal'>Monto Final:</label>
              <input
                type='number'
                id='montoFinal'
                name='montoFinal'
                step='0.01'
                value={montoFinal}
                onChange={(e) => setMontoFinal(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='montoInicial'>Monto Inicial:</label>
              <input
                type='number'
                id='montoInicial'
                name='montoInicial'
                step='0.01'
                value={montoInicial}
                onChange={(e) => setMontoInicial(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='totalPeriodos'>Número total de periodos:</label>
              <input
                type='number'
                id='totalPeriodos'
                name='totalPeriodos'
                value={totalPeriodos}
                onChange={(e) => setTotalPeriodos(e.target.value)}
              />
            </div>

            <button type='submit' className='calculate-btn'>
              Calcular
            </button>
          </form>

          {resultado !== null && (
            <div className='result-container'>
              <p className='result-text'>El interés calculado es:</p>
              <span className='result-value'>{resultado.toFixed(2) + '%'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
