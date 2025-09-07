import '../styles/Interes.css'

export function Interes() {
  // Aqui voy a necesitar:
  // r = tasa de interes nominal anual
  // n = numero de periodos
  return (
    <div className='interes-container'>
      <h1>Calculo del interes</h1>
      <p>
        Para calcular el interes se usara la formula de la tasa efectiva anual
      </p>

      <form action='' className='interes-form'>
        <label>Interes = </label>
        <label htmlFor='monto'>Capital inicial:</label>
        <input type='number' id='monto' name='monto' />
        <label htmlFor='tiempo'>
          Tasa de Interes Nominal Anual (en decimales):
        </label>
        <input type='number' id='tiempo' name='tiempo' />
        <button type='submit'>Calcular</button>
      </form>
    </div>
  )
}
