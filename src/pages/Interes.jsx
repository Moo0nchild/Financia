import { useState } from 'react'
import { calcularInteres } from '../lib/data'
import '../styles/Interes.css'

export function Interes() {
  // Aqui voy a necesitar:
  // r = tasa de interes nominal anual
  // n = numero de periodos

  const [resultado, setResultado] = useState(null)

  function onSubmit(e) {
    e.preventDefault()

    // obtener valores del formulario
    const interesNominal = parseFloat(e.target.interes.value)
    const numeroPeriodos = parseFloat(e.target.periodos.value)

    const resultadoCalculo = calcularInteres(interesNominal, numeroPeriodos)
    setResultado(resultadoCalculo)
  }

  return (
    <div className='interes-container'>
      <h1>Calculo del interes</h1>
      <p>
        Para calcular el interes se usara la formula de la tasa efectiva anual
      </p>

      <form className='interes-form' onSubmit={onSubmit}>
        <label htmlFor='interes'>
          Tasa de Interes Nominal Anual (en decimales):
        </label>
        <input type='number' id='interes' name='interes' step='0.01' />

        <label htmlFor='periodos'>Número de periodos:</label>
        <input type='number' id='periodos' name='periodos' />

        <button type='submit'>Calcular</button>
      </form>

      {resultado !== null && (
        <p>El interés calculado es: {resultado.toFixed(2) + '%'}</p>
      )}
    </div>
  )
}
