import { useState } from 'react'
import { calcularInteresCompuesto } from '../lib/data'
import '../styles/interesCompuesto.css'
export function InteresCompuesto() {
  const [opcion, setOpcion] = useState('monto')
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [periodos, setPeriodos] = useState('')
  const [montoFinal, setMontoFinal] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    let res = null

    const C = parseFloat(capital)
    const i = parseFloat(tasa) / 100
    const n = parseInt(periodos)
    const MC = parseFloat(montoFinal)

    switch (opcion) {
      case 'monto':
        res = calcularInteresCompuesto.calcularMontoCompuesto(C, i, n)
        setResultado(`Monto Compuesto: $${res.toFixed(2)}`)
        break

      case 'interes':
        res = calcularInteresCompuesto.calcularInteresCompuesto(C, i, n)
        setResultado(`Interés Compuesto: $${res.toFixed(2)}`)
        break

      case 'capital':
        res = calcularInteresCompuesto.calcularCapitalInicial(MC, i, n)
        setResultado(`Capital Inicial: $${res.toFixed(2)}`)
        break

      case 'tasa':
        res = calcularInteresCompuesto.calcularTasa(C, MC, n)
        setResultado(`Tasa de Interés: ${(res * 100).toFixed(2)}%`)
        break

      case 'tiempo':
        res = calcularInteresCompuesto.calcularTiempo(C, MC, i)
        setResultado(`Tiempo: ${res.toFixed(2)} periodos`)
        break

      default:
        setResultado('Selecciona una opción válida')
    }
  }

  return (
    <div className='interes-main-container'>
      <div className='interes-header'>
        <h1>Calculadora de Interés Compuesto</h1>
      </div>

      {/* Selector */}
      <div className='mode-selector'>
        <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
          <option value='monto'>Monto Compuesto</option>
          <option value='interes'>Interés Compuesto</option>
          <option value='capital'>Capital Inicial</option>
          <option value='tasa'>Tasa de Interés</option>
          <option value='tiempo'>Tiempo (n)</option>
        </select>
      </div>

      {/* Contenedor principal */}
      <div className='interes-container'>
        <h1>Datos</h1>

        {(opcion === 'monto' || opcion === 'interes') && (
          <>
            <Input
              label='Capital Inicial ($)'
              value={capital}
              onChange={setCapital}
            />
            <Input
              label='Tasa de Interés (%)'
              value={tasa}
              onChange={setTasa}
            />
            <Input
              label='Número de Periodos'
              value={periodos}
              onChange={setPeriodos}
            />
          </>
        )}

        {opcion === 'capital' && (
          <>
            <Input
              label='Monto Final ($)'
              value={montoFinal}
              onChange={setMontoFinal}
            />
            <Input
              label='Tasa de Interés (%)'
              value={tasa}
              onChange={setTasa}
            />
            <Input
              label='Número de Periodos'
              value={periodos}
              onChange={setPeriodos}
            />
          </>
        )}

        {opcion === 'tasa' && (
          <>
            <Input
              label='Capital Inicial ($)'
              value={capital}
              onChange={setCapital}
            />
            <Input
              label='Monto Final ($)'
              value={montoFinal}
              onChange={setMontoFinal}
            />
            <Input
              label='Número de Periodos'
              value={periodos}
              onChange={setPeriodos}
            />
          </>
        )}

        {opcion === 'tiempo' && (
          <>
            <Input
              label='Capital Inicial ($)'
              value={capital}
              onChange={setCapital}
            />
            <Input
              label='Monto Final ($)'
              value={montoFinal}
              onChange={setMontoFinal}
            />
            <Input
              label='Tasa de Interés (%)'
              value={tasa}
              onChange={setTasa}
            />
          </>
        )}

        <button onClick={calcular} className='calculate-btn'>
          Calcular
        </button>

        {resultado && (
          <div className='result-container'>
            <p className='result-text'>Resultado:</p>
            <span className='result-value'>{resultado}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Input reutilizable con tu CSS
function Input({ label, value, onChange }) {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <input
        type='number'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
