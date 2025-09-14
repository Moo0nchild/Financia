import { useState } from 'react'
import { calcularInteresCompuesto } from '../lib/data'
import '../styles/interesCompuesto.css'

export function InteresCompuesto() {
  const [opcion, setOpcion] = useState('monto')
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [periodos, setPeriodos] = useState('')
  const [montoFinal, setMontoFinal] = useState('')

  const [unidad, setUnidad] = useState('anual') 
  const [resultado, setResultado] = useState(null)

  const frecuencias = {
    diaria: { diasPorPeriodo: 1 },
    mensual: { diasPorPeriodo: 30 },
    trimestral: { diasPorPeriodo: 90 },
    cuatrimestral: { diasPorPeriodo: 120 },
    semestral: { diasPorPeriodo: 180 },
    anual: { diasPorPeriodo: 360 }

  const [unidad, setUnidad] = useState('anual') // 👈 frecuencia inicial
  const [resultado, setResultado] = useState(null)

  const frecuencias = {
  diaria: { diasPorPeriodo: 1 },
  mensual: { diasPorPeriodo: 30 },
  trimestral: { diasPorPeriodo: 90 },
  cuatrimestral: { diasPorPeriodo: 120 },
  semestral: { diasPorPeriodo: 180 },
  anual: { diasPorPeriodo: 360 }

  }

  const calcular = () => {
    const C = parseFloat(capital)
    const MC = parseFloat(montoFinal)
    let i = parseFloat(tasa) / 100
    let n = parseFloat(periodos)

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
        res = calcularInteresCompuesto.calcularMontoCompuesto(C, tasaDiaria, totalDias)
        setResultado(`Monto Compuesto: $${res.toFixed(2)}`)
        break

      case 'tasa':
        res = calcularInteresCompuesto.calcularTasa(C, MC, totalDias)
        setResultado(`Tasa de Interés: ${(res * 100).toFixed(2)}% ${unidad}`)
        break

      case 'tiempo':
        res = calcularInteresCompuesto.calcularTiempo(C, MC, i)
        setResultado(`Tiempo: ${res.toFixed(2)} ${unidad}`)
        break
        
      case 'interes':
        res = calcularInteresCompuesto.calcularInteresCompuesto(C, tasaDiaria, totalDias)
        setResultado(`Interés Compuesto: $${res.toFixed(2)}`)
        break

      case 'capital':
        res = calcularInteresCompuesto.calcularCapitalInicial(MC, tasaDiaria, totalDias)
        setResultado(`Capital Inicial: $${res.toFixed(2)}`)
        break


      case 'tasa':
        res = calcularInteresCompuesto.calcularTasa(C, MC, totalDias)
        setResultado(`Tasa de Interés: ${(res * 100).toFixed(2)}% anual`)
        break

      case 'tiempo':
        res = calcularInteresCompuesto.calcularTiempo(C, MC, tasaDiaria)
        setResultado(`Tiempo: ${res.toFixed(2)} días`)
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



      {/* Selector de cálculo */}

      <div className='mode-selector'>
        <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
          <option value='monto'>Monto Compuesto</option>
          <option value='tasa'>Tasa de Interés</option>
          <option value='tiempo'>Tiempo (n)</option>
          <option value='interes'>Interés Compuesto</option>
          <option value='capital'>Capital Inicial</option>
        </select>
      </div>


      <div className='interes-container'>
        <h1>Datos</h1>

        {(opcion === 'monto' || opcion === 'interes') && (
          <>
            <Input label='Capital Inicial ($)' value={capital} onChange={setCapital} />
            <Input label='Tasa de Interés (%)' value={tasa} onChange={setTasa} />

              <div className=''>
                <label>Frecuencia:</label>
                <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
                  <option value='diaria'>Diaria</option>
                  <option value='mensual'>Mensual</option>
                  <option value='trimestral'>Trimestral</option>
                  <option value='cuatrimestral'>Cuatrimestral</option>
                  <option value='semestral'>Semestral</option>
                  <option value='anual'>Anual</option>
                </select>
              </div>

            <Input label={`Número de Periodos (${unidad})`} value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === 'capital' && (
          <>
            <Input label='Monto Final ($)' value={montoFinal} onChange={setMontoFinal} />
            <Input label='Tasa de Interés (%)' value={tasa} onChange={setTasa} />
            <Input label={`Número de Periodos (${unidad})`} value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === 'tasa' && (
          <>
            <Input label='Capital Inicial ($)' value={capital} onChange={setCapital} />
            <Input label='Monto Final ($)' value={montoFinal} onChange={setMontoFinal} />
            <Input label={`Número de Periodos (${unidad})`} value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === 'tiempo' && (
          <>
            <Input label='Capital Inicial ($)' value={capital} onChange={setCapital} />
            <Input label='Monto Final ($)' value={montoFinal} onChange={setMontoFinal} />
            <Input label='Tasa de Interés (%)' value={tasa} onChange={setTasa} />
          </>
        )}
        <div className='form-group'>
          <label>Frecuencia:</label>
          <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
            <option value='diaria'>Diaria</option>
            <option value='mensual'>Mensual</option>
            <option value='trimestral'>Trimestral</option>
            <option value='cuatrimestral'>Cuatrimestral</option>
            <option value='semestral'>Semestral</option>
            <option value='anual'>Anual</option>
          </select>
        </div>

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

// Input reutilizable
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
