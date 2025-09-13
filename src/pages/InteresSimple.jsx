import { useState } from 'react'
import { calcularInteresSimple } from '../lib/data'

export function InteresSimple() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState('general')

  // estados para inputs
  const [capital, setCapital] = useState('')
  const [tasaInteres, setTasaInteres] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [montoTotal, setMontoTotal] = useState('')

  function onSubmitGeneral(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.calcularInteres(
      parseFloat(capital),
      parseFloat(tasaInteres),
      parseFloat(tiempo)
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitValorFuturo(e) {
    e.preventDefault()
    // const resultadoCalculoRendimiento =
    //   calcularInteres.calcularInteresRendimiento(
    //     parseFloat(montoFinal),
    //     parseFloat(montoInicial),
    //     parseFloat(totalPeriodos)
    //   )
    // setResultado(resultadoCalculoRendimiento)
  }

  function handleSelectChange(e) {
    setResultado(null)
    switch (e.target.value) {
      case 'general':
        setOpcion('general')
        break
      case 'valorFuturo':
        setOpcion('valorFuturo')
        break
      case 'capital':
        setOpcion('capital')
        break
      case 'tasa':
        setOpcion('tasa')
        break
      case 'tiempo':
        setOpcion('tiempo')
        break
      default:
        break
    }

    // limpiar todos los inputs
    setCapital('')
    setMontoTotal('')
    setTasaInteres('')
    setTiempo('')
    setMontoTotal('')
  }

  return (
    <div className='interes-main-container'>
      <div className='interes-header'>
        <h1>Cálculo del Interés Simple</h1>
      </div>

      <div className='mode-selector'>
        <select onChange={handleSelectChange}>
          <option value='general'>Formula general</option>
          <option value='valorFuturo'>Según valor futuro</option>
          <option value='capital'>Según el capital</option>
          <option value='tasa'>Según la tasa</option>
          <option value='tiempo'>Según tiempo</option>
        </select>
      </div>

      {opcion === 'general' && (
        <div className='interes-container'>
          <h1>Formula General del Interes Simple</h1>
          <div className='interes-description'>
            <p>Para calcular el interés se usará la fórmula de la TEA</p>
            <p>te la meto</p>
          </div>

          <div className='formula-box'>aca va la formula xd</div>

          <form className='interes-form' onSubmit={onSubmitGeneral}>
            <div className='form-group'>
              <label htmlFor='capital'>Capital Inicial:</label>
              <input
                type='number'
                id='capital'
                name='capital'
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='tasaInteres'>Tasa de Interes (en decimal):</label>
              <input
                type='number'
                id='tasaInteres'
                name='tasaInteres'
                value={tasaInteres}
                onChange={(e) => setTasaInteres(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Tiempo'>Tiempo:</label>
              <input
                type='number'
                id='tiempo'
                name='tiempo'
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
              />
            </div>

            <button type='submit' className='calculate-btn'>
              Calcular
            </button>
          </form>

          {resultado !== null && (
            <div className='result-container'>
              <p className='result-text'>El interés simple calculado es:</p>
              <span className='result-value'>{resultado.toFixed(2) + '%'}</span>
            </div>
          )}
        </div>
      )}

      {opcion === 'valorFuturo' && (
        <div className='interes-container'>
          <h1>por valor futuro (monto)</h1>
          <div className='interes-description'>
            <p>tqleo</p>
            <p>te la meto</p>
          </div>

          <div className='formula-box'>aca va la formula xd</div>

          <form className='interes-form' onSubmit={onSubmitGeneral}>
            <div className='form-group'>
              <label htmlFor='capital'>Capital Inicial:</label>
              <input
                type='number'
                id='capital'
                name='capital'
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='tasaInteres'>Tasa de Interes (en decimal):</label>
              <input
                type='number'
                id='tasaInteres'
                name='tasaInteres'
                value={tasaInteres}
                onChange={(e) => setTasaInteres(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Tiempo'>Tiempo:</label>
              <input
                type='number'
                id='tiempo'
                name='tiempo'
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
              />
            </div>

            <button type='submit' className='calculate-btn'>
              Calcular
            </button>
          </form>

          {resultado !== null && (
            <div className='result-container'>
              <p className='result-text'>El interés simple calculado es:</p>
              <span className='result-value'>{resultado.toFixed(2) + '%'}</span>
            </div>
          )}
        </div>
      )}

      {/* {opcion === 'capital' && ( 
        
      )} */}

      {/* {opcion === 'tasa' && (

      )} */}

      {/* {opcion === 'tiempo' && (

      )} */}
    </div>
  )
}
