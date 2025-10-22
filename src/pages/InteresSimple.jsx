// import { useState } from 'react'
// import { calcularInteresSimple } from '../lib/data'
// import PageWrapper from '../components/PageWrapper'

// export function InteresSimple() {
//   const [resultado, setResultado] = useState(null)
//   const [opcion, setOpcion] = useState('general')
//   const [capital, setCapital] = useState('')
//   const [tasaInteres, setTasaInteres] = useState('')
//   const [tiempo, setTiempo] = useState('')
//   const [montoTotal, setMontoTotal] = useState('')
//   const [modoTiempo, setModoTiempo] = useState('anios-simple') // 'anios-simple' o 'anios-meses-dias'
//   const [tiempoAnios, setTiempoAnios] = useState('')
//   const [tiempoMeses, setTiempoMeses] = useState('')
//   const [tiempoDias, setTiempoDias] = useState('')

//   // Función para formatear números en formato de pesos colombianos
//   const formatoPesos = (valor) => {
//     return new Intl.NumberFormat('es-CO', {
//       style: 'currency',
//       currency: 'COP',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(valor)
//   }

//   // Función para obtener el tiempo total en años según el modo seleccionado
//   const getTiempoEnAnios = () => {
//     if (modoTiempo === 'anios-simple') {
//       return parseFloat(tiempo) || 0
//     } else {
//       const anios = parseFloat(tiempoAnios) || 0
//       const meses = parseFloat(tiempoMeses) || 0
//       const dias = parseFloat(tiempoDias) || 0

//       // Convertir todo a años: meses/12 + dias/360
//       return anios + meses / 12 + dias / 360
//     }
//   }

//   // Configuración de cada opción
//   const opcionesConfig = {
//     general: {
//       titulo: 'Fórmula General del Interés Simple',
//       descripcion:
//         'El interés simple es una herramienta financiera que se usa para calcular cuánto dinero extra se paga o se gana por prestar o invertir un capital durante un tiempo determinado.',
//       formula: 'Interés = Capital Inicial × Tasa de Interés × Tiempo',
//       onSubmit: onSubmitGeneral,
//       campos: [
//         {
//           id: 'capital',
//           label: 'Capital Inicial (Sin puntos ni comas):',
//           value: capital,
//           onChange: setCapital,
//           unidad: '$',
//         },
//         {
//           id: 'tasaInteres',
//           label: 'Tasa de Interés (Entero):',
//           value: tasaInteres,
//           onChange: setTasaInteres,
//           unidad: '%',
//         },
//       ],
//       textoResultado: 'El interés simple calculado es de:',
//       unidadResultado: '$',
//       esMonetario: true,
//     },
//     valorFuturo: {
//       titulo: 'Valor Futuro (Monto)',
//       descripcion:
//         'Calcula el monto total futuro considerando el capital inicial más el interés simple generado.',
//       formula: 'Monto Final = Capital Inicial × (1 + Tasa de Interés × Tiempo)',
//       onSubmit: onSubmitValorFuturo,
//       campos: [
//         {
//           id: 'capital',
//           label: 'Capital Inicial (Sin punto ni comas):',
//           value: capital,
//           onChange: setCapital,
//           unidad: '$',
//         },
//         {
//           id: 'tasaInteres',
//           label: 'Tasa de Interés (Entero):',
//           value: tasaInteres,
//           onChange: setTasaInteres,
//           unidad: '%',
//         },
//       ],
//       textoResultado: 'El valor futuro calculado es:',
//       unidadResultado: '$',
//       esMonetario: true,
//     },
//     capital: {
//       titulo: 'Capital (Según Monto)',
//       descripcion:
//         'Calcula cuánto fue el capital invertido o prestado, conociendo el monto final, la tasa y el tiempo.',
//       formula: 'Capital = Monto Final / (1 + Tasa de Interés × Tiempo)',
//       onSubmit: onSubmitCapital,
//       campos: [
//         {
//           id: 'montoTotal',
//           label: 'Monto Final (Sin punto ni comas):',
//           value: montoTotal,
//           onChange: setMontoTotal,
//           unidad: '$',
//         },
//         {
//           id: 'tasaInteres',
//           label: 'Tasa de Interés (Entero):',
//           value: tasaInteres,
//           onChange: setTasaInteres,
//           unidad: '%',
//         },
//       ],
//       textoResultado: 'El capital calculado es:',
//       unidadResultado: '$',
//       esMonetario: true,
//     },
//     tasa: {
//       titulo: 'Tasa de Interés (Según Monto)',
//       descripcion:
//         'Calcula qué porcentaje de interés se aplicó, conociendo capital, monto final y tiempo.',
//       formula:
//         'Tasa de Interés = ((Monto Final / Capital Inicial) - 1) / Tiempo',
//       onSubmit: onSubmitTasa,
//       campos: [
//         {
//           id: 'montoTotal',
//           label: 'Monto Final (Sin punto ni comas):',
//           value: montoTotal,
//           onChange: setMontoTotal,
//           unidad: '$',
//         },
//         {
//           id: 'capital',
//           label: 'Capital Inicial (Sin punto ni comas):',
//           value: capital,
//           onChange: setCapital,
//           unidad: '$',
//         },
//       ],
//       textoResultado: 'La tasa de interés calculada es:',
//       unidadResultado: '%',
//       esMonetario: false,
//     },
//     tiempo: {
//       titulo: 'Tiempo (Según Monto)',
//       descripcion:
//         'Calcula cuánto tiempo duró la inversión o el préstamo, conociendo capital, monto final y tasa.',
//       formula:
//         'Tiempo = ((Monto Final / Capital Inicial) - 1) / Tasa de Interés',
//       onSubmit: onSubmitTiempo,
//       campos: [
//         {
//           id: 'montoTotal',
//           label: 'Monto Final (Sin punto ni comas):',
//           value: montoTotal,
//           onChange: setMontoTotal,
//           unidad: '$',
//         },
//         {
//           id: 'capital',
//           label: 'Capital Inicial (Sin punto ni comas):',
//           value: capital,
//           onChange: setCapital,
//           unidad: '$',
//         },
//         {
//           id: 'tasaInteres',
//           label: 'Tasa de Interés (Entero):',
//           value: tasaInteres,
//           onChange: setTasaInteres,
//           unidad: '%',
//         },
//       ],
//       textoResultado: 'El tiempo calculado es:',
//       unidadResultado: ' años',
//       esMonetario: false,
//     },
//   }

//   // Funciones de cálculo actualizadas
//   function onSubmitGeneral(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(tasaInteres) / 100
//     const tiempoEnAnios = getTiempoEnAnios()
//     const resultadoCalculo = calcularInteresSimple.calcularInteresSimple(
//       parseFloat(capital),
//       tasaDecimal,
//       tiempoEnAnios
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitValorFuturo(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(tasaInteres) / 100
//     const tiempoEnAnios = getTiempoEnAnios()
//     const resultadoCalculo = calcularInteresSimple.calcularValorFuturo(
//       parseFloat(capital),
//       tasaDecimal,
//       tiempoEnAnios
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitCapital(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(tasaInteres) / 100
//     const tiempoEnAnios = getTiempoEnAnios()
//     const resultadoCalculo = calcularInteresSimple.calcularCapital(
//       parseFloat(montoTotal),
//       tasaDecimal,
//       tiempoEnAnios
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitTasa(e) {
//     e.preventDefault()
//     const tiempoEnAnios = getTiempoEnAnios()
//     const resultadoCalculo = calcularInteresSimple.calcularTasa(
//       parseFloat(capital),
//       parseFloat(montoTotal),
//       tiempoEnAnios
//     )
//     setResultado(resultadoCalculo * 100) // Convertir a porcentaje
//   }

//   function onSubmitTiempo(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(tasaInteres) / 100
//     const resultadoCalculo = calcularInteresSimple.calcularTiempo(
//       parseFloat(capital),
//       parseFloat(montoTotal),
//       tasaDecimal
//     )
//     setResultado(resultadoCalculo)
//   }

//   function handleSelectChange(e) {
//     const value = e.target.value
//     setOpcion(value)
//     setResultado(null)

//     // Limpiar todos los inputs
//     setCapital('')
//     setTasaInteres('')
//     setTiempo('')
//     setMontoTotal('')
//     setTiempoAnios('')
//     setTiempoMeses('')
//     setTiempoDias('')
//   }

//   function handleModoTiempoChange(e) {
//     setModoTiempo(e.target.value)
//     setResultado(null)
//     // Limpiar los campos de tiempo
//     setTiempo('')
//     setTiempoAnios('')
//     setTiempoMeses('')
//     setTiempoDias('')
//   }

//   const config = opcionesConfig[opcion]

//   // Determinar si debemos deshabilitar los campos de tiempo
//   const deshabilitarTiempo = opcion === 'tiempo'

//   return (
//     <PageWrapper>
//       <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
//         <div className='max-w-4xl mx-auto'>
//           {/* Header */}
//           <div className='text-center mb-8'>
//             <h1 className='text-4xl font-bold text-gray-800 mb-2'>
//               Calculadora de Interés Simple
//             </h1>
//             <p className='text-gray-600'>
//               Herramienta para diferentes cálculos de interés simple
//             </p>
//           </div>

//           {/* Selector de modo */}
//           <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
//             <label
//               htmlFor='mode-select'
//               className='block text-sm font-medium text-gray-700 mb-2'
//             >
//               Selecciona el tipo de cálculo:
//             </label>
//             <select
//               id='mode-select'
//               onChange={handleSelectChange}
//               value={opcion}
//               className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 mb-4'
//             >
//               <option value='general'>Fórmula general</option>
//               <option value='valorFuturo'>Valor futuro</option>
//               <option value='capital'>Capital (según monto)</option>
//               <option value='tasa'>Tasa (según monto)</option>
//               <option value='tiempo'>Tiempo (según monto)</option>
//             </select>

//             {/* Selector de unidad de tiempo - deshabilitado cuando se selecciona tiempo */}
//             <label
//               htmlFor='time-mode-select'
//               className='block text-sm font-medium text-gray-700 mb-2'
//             >
//               Unidad de tiempo:
//             </label>
//             <select
//               id='time-mode-select'
//               onChange={handleModoTiempoChange}
//               value={modoTiempo}
//               disabled={deshabilitarTiempo}
//               className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                 deshabilitarTiempo ? 'bg-gray-100 text-gray-500' : 'bg-gray-50'
//               }`}
//             >
//               <option value='anios-simple'>
//                 Tiempo en años
//               </option>
//               <option value='anios-meses-dias'>
//                 Tiempo en años, meses y días
//               </option>
//             </select>
//           </div>

//           {/* Contenedor principal */}
//           <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
//             {/* Header con gradiente */}
//             <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
//               <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
//               <p className='opacity-90'>{config.descripcion}</p>
//             </div>

//             <div className='p-6'>
//               {/* Fórmula */}
//               <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
//                 <p className='text-sm font-medium text-indigo-800 mb-1'>
//                   Fórmula:
//                 </p>
//                 <code className='text-indigo-700 font-mono'>
//                   {config.formula}
//                 </code>
//               </div>

//               {/* Formulario */}
//               <form onSubmit={config.onSubmit} className='space-y-4'>
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                   {config.campos.map((campo) => (
//                     <div key={campo.id}>
//                       <label
//                         htmlFor={campo.id}
//                         className='block text-sm font-medium text-gray-700 mb-1'
//                       >
//                         {campo.label}
//                       </label>
//                       <div className='relative'>
//                         <input
//                           type='number'
//                           id={campo.id}
//                           name={campo.id}
//                           step='0.01'
//                           value={campo.value}
//                           onChange={(e) => campo.onChange(e.target.value)}
//                           className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12'
//                           placeholder='0'
//                           required
//                         />
//                         <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
//                           <span className='text-gray-500'>{campo.unidad}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Campos de tiempo según el modo seleccionado - deshabilitados cuando se selecciona tiempo */}
//                   {modoTiempo === 'anios-simple' ? (
//                     <div>
//                       <label
//                         htmlFor='tiempo'
//                         className='block text-sm font-medium text-gray-700 mb-1'
//                       >
//                         Tiempo:
//                       </label>
//                       <div className='relative'>
//                         <input
//                           type='number'
//                           id='tiempo'
//                           name='tiempo'
//                           step='0.01'
//                           value={tiempo}
//                           onChange={(e) => setTiempo(e.target.value)}
//                           className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
//                             deshabilitarTiempo
//                               ? 'bg-gray-100 text-gray-500'
//                               : ''
//                           }`}
//                           placeholder='0.00'
//                           required
//                           disabled={deshabilitarTiempo}
//                         />
//                         <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
//                           <span
//                             className={`${
//                               deshabilitarTiempo
//                                 ? 'text-gray-400'
//                                 : 'text-gray-500'
//                             }`}
//                           >
//                             años
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className='md:col-span-2'>
//                       <label className='block text-sm font-medium text-gray-700 mb-1'>
//                         Tiempo:
//                       </label>
//                       <div className='grid grid-cols-3 gap-4'>
//                         <div className='relative'>
//                           <input
//                             type='number'
//                             id='tiempo-anios'
//                             name='tiempo-anios'
//                             step='1'
//                             min='0'
//                             value={tiempoAnios}
//                             onChange={(e) => setTiempoAnios(e.target.value)}
//                             className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
//                               deshabilitarTiempo
//                                 ? 'bg-gray-100 text-gray-500'
//                                 : ''
//                             }`}
//                             placeholder='0'
//                             disabled={deshabilitarTiempo}
//                           />
//                           <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
//                             <span
//                               className={`${
//                                 deshabilitarTiempo
//                                   ? 'text-gray-400'
//                                   : 'text-gray-500'
//                               }`}
//                             >
//                               años
//                             </span>
//                           </div>
//                         </div>
//                         <div className='relative'>
//                           <input
//                             type='number'
//                             id='tiempo-meses'
//                             name='tiempo-meses'
//                             step='1'
//                             min='0'
//                             max='11'
//                             value={tiempoMeses}
//                             onChange={(e) => setTiempoMeses(e.target.value)}
//                             className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
//                               deshabilitarTiempo
//                                 ? 'bg-gray-100 text-gray-500'
//                                 : ''
//                             }`}
//                             placeholder='0'
//                             disabled={deshabilitarTiempo}
//                           />
//                           <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
//                             <span
//                               className={`${
//                                 deshabilitarTiempo
//                                   ? 'text-gray-400'
//                                   : 'text-gray-500'
//                               }`}
//                             >
//                               meses
//                             </span>
//                           </div>
//                         </div>
//                         <div className='relative'>
//                           <input
//                             type='number'
//                             id='tiempo-dias'
//                             name='tiempo-dias'
//                             step='1'
//                             min='0'
//                             max='30'
//                             value={tiempoDias}
//                             onChange={(e) => setTiempoDias(e.target.value)}
//                             className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
//                               deshabilitarTiempo
//                                 ? 'bg-gray-100 text-gray-500'
//                                 : ''
//                             }`}
//                             placeholder='0'
//                             disabled={deshabilitarTiempo}
//                           />
//                           <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
//                             <span
//                               className={`${
//                                 deshabilitarTiempo
//                                   ? 'text-gray-400'
//                                   : 'text-gray-500'
//                               }`}
//                             >
//                               días
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type='submit'
//                   className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
//                 >
//                   Calcular
//                 </button>
//               </form>

//               {/* Resultado */}
//               {resultado !== null && (
//                 <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
//                   <p className='text-green-800 font-medium'>
//                     {config.textoResultado}
//                   </p>
//                   <div className='text-2xl font-bold text-green-700 mt-1'>
//                     {config.esMonetario
//                       ? formatoPesos(resultado)
//                       : `${resultado.toFixed(2)}${config.unidadResultado}`}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   )
// }

import { useState } from 'react'
import { calcularInteresSimple } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function InteresSimple() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState('general')
  const [capital, setCapital] = useState('')
  const [tasaInteres, setTasaInteres] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [montoTotal, setMontoTotal] = useState('')
  const [modoTiempo, setModoTiempo] = useState('anios-simple')
  const [tiempoAnios, setTiempoAnios] = useState('')
  const [tiempoMeses, setTiempoMeses] = useState('')
  const [tiempoDias, setTiempoDias] = useState('')
  const [fraccionRetiro, setFraccionRetiro] = useState('')

  const formatoPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  const getTiempoEnAnios = () => {
    if (modoTiempo === 'anios-simple') {
      return parseFloat(tiempo) || 0
    } else {
      const anios = parseFloat(tiempoAnios) || 0
      const meses = parseFloat(tiempoMeses) || 0
      const dias = parseFloat(tiempoDias) || 0
      return anios + meses / 12 + dias / 360
    }
  }

  // Funciones de cálculo
  function onSubmitGeneral(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaInteres) / 100
    const tiempoEnAnios = getTiempoEnAnios()
    const resultadoCalculo = calcularInteresSimple.calcularInteresSimple(
      parseFloat(capital),
      tasaDecimal,
      tiempoEnAnios
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitValorFuturo(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaInteres) / 100
    const tiempoEnAnios = getTiempoEnAnios()
    const resultadoCalculo = calcularInteresSimple.calcularValorFuturo(
      parseFloat(capital),
      tasaDecimal,
      tiempoEnAnios
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitCapital(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaInteres) / 100
    const tiempoEnAnios = getTiempoEnAnios()
    const resultadoCalculo = calcularInteresSimple.calcularCapital(
      parseFloat(montoTotal),
      tasaDecimal,
      tiempoEnAnios
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitTasa(e) {
    e.preventDefault()
    const tiempoEnAnios = getTiempoEnAnios()
    const resultadoCalculo = calcularInteresSimple.calcularTasa(
      parseFloat(capital),
      parseFloat(montoTotal),
      tiempoEnAnios
    )
    setResultado(resultadoCalculo * 100)
  }

  function onSubmitTiempo(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaInteres) / 100
    const resultadoCalculo = calcularInteresSimple.calcularTiempo(
      parseFloat(capital),
      parseFloat(montoTotal),
      tasaDecimal
    )
    setResultado(resultadoCalculo)
  }

  // NUEVA FUNCIÓN: Para calcular retiro parcial
  function onSubmitRetiroParcial(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaInteres) / 100
    const tiempoEnAnios = getTiempoEnAnios()
    const fraccionDecimal = parseFloat(fraccionRetiro) / 100
    const resultadoCalculo = calcularInteresSimple.calcularRetiroParcial(
      parseFloat(capital),
      tasaDecimal,
      tiempoEnAnios,
      fraccionDecimal
    )
    setResultado(resultadoCalculo)
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)
    setCapital('')
    setTasaInteres('')
    setTiempo('')
    setMontoTotal('')
    setTiempoAnios('')
    setTiempoMeses('')
    setTiempoDias('')
    setFraccionRetiro('')
  }

  function handleModoTiempoChange(e) {
    setModoTiempo(e.target.value)
    setResultado(null)
    setTiempo('')
    setTiempoAnios('')
    setTiempoMeses('')
    setTiempoDias('')
  }

  // Configuración de cada opción
  const opcionesConfig = {
    general: {
      titulo: 'Fórmula General del Interés Simple',
      descripcion:
        'El interés simple es una herramienta financiera que se usa para calcular cuánto dinero extra se paga o se gana por prestar o invertir un capital durante un tiempo determinado.',
      formula: 'Interés = Capital Inicial × Tasa de Interés × Tiempo',
      onSubmit: onSubmitGeneral,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial (Sin puntos ni comas):',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (Entero):',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El interés simple calculado es de:',
      unidadResultado: '$',
      esMonetario: true,
      tipoResultado: 'simple',
    },
    valorFuturo: {
      titulo: 'Valor Futuro (Monto)',
      descripcion:
        'Calcula el monto total futuro considerando el capital inicial más el interés simple generado.',
      formula: 'Monto Final = Capital Inicial × (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitValorFuturo,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial (Sin punto ni comas):',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (Entero):',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      unidadResultado: '$',
      esMonetario: true,
      tipoResultado: 'simple',
    },
    capital: {
      titulo: 'Capital (Según Monto)',
      descripcion:
        'Calcula cuánto fue el capital invertido o prestado, conociendo el monto final, la tasa y el tiempo.',
      formula: 'Capital = Monto Final / (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitCapital,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final (Sin punto ni comas):',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (Entero):',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El capital calculado es:',
      unidadResultado: '$',
      esMonetario: true,
      tipoResultado: 'simple',
    },
    tasa: {
      titulo: 'Tasa de Interés (Según Monto)',
      descripcion:
        'Calcula qué porcentaje de interés se aplicó, conociendo capital, monto final y tiempo.',
      formula:
        'Tasa de Interés = ((Monto Final / Capital Inicial) - 1) / Tiempo',
      onSubmit: onSubmitTasa,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final (Sin punto ni comas):',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'capital',
          label: 'Capital Inicial (Sin punto ni comas):',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
      ],
      textoResultado: 'La tasa de interés calculada es:',
      unidadResultado: '%',
      esMonetario: false,
      tipoResultado: 'simple',
    },
    tiempo: {
      titulo: 'Tiempo (Según Monto)',
      descripcion:
        'Calcula cuánto tiempo duró la inversión o el préstamo, conociendo capital, monto final y tasa.',
      formula:
        'Tiempo = ((Monto Final / Capital Inicial) - 1) / Tasa de Interés',
      onSubmit: onSubmitTiempo,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final (Sin punto ni comas):',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'capital',
          label: 'Capital Inicial (Sin punto ni comas):',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (Entero):',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El tiempo calculado es:',
      unidadResultado: ' años',
      esMonetario: false,
      tipoResultado: 'simple',
    },
    retiroParcial: {
      titulo: 'Retiro Parcial',
      descripcion:
        'Calcula cuánto dinero se acumula y cuánto se retira cuando haces un retiro parcial de la inversión.',
      formula: 'Monto Retirado = Valor Futuro × Fracción de Retiro',
      onSubmit: onSubmitRetiroParcial,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial (Sin punto ni comas):',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés (Entero):',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
        {
          id: 'fraccionRetiro',
          label: 'Porcentaje a Retirar (Ej: 75 para 3/4):',
          value: fraccionRetiro,
          onChange: setFraccionRetiro,
          unidad: '%',
        },
      ],
      textoResultado: 'Detalle del retiro:',
      unidadResultado: '',
      esMonetario: false,
      tipoResultado: 'retiro',
    },
  }

  const config = opcionesConfig[opcion]
  const deshabilitarTiempo = opcion === 'tiempo'

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Interés Simple
            </h1>
            <p className='text-gray-600'>
              Herramienta para diferentes cálculos de interés simple
            </p>
          </div>

          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <label
              htmlFor='mode-select'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Selecciona el tipo de cálculo:
            </label>
            <select
              id='mode-select'
              onChange={handleSelectChange}
              value={opcion}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 mb-4'
            >
              <option value='general'>Fórmula general</option>
              <option value='valorFuturo'>Valor futuro</option>
              <option value='capital'>Capital (según monto)</option>
              <option value='tasa'>Tasa (según monto)</option>
              <option value='tiempo'>Tiempo (según monto)</option>
              <option value='retiroParcial'>Retiro Parcial</option>
            </select>

            <label
              htmlFor='time-mode-select'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Unidad de tiempo:
            </label>
            <select
              id='time-mode-select'
              onChange={handleModoTiempoChange}
              value={modoTiempo}
              disabled={deshabilitarTiempo}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                deshabilitarTiempo ? 'bg-gray-100 text-gray-500' : 'bg-gray-50'
              }`}
            >
              <option value='anios-simple'>Tiempo en años</option>
              <option value='anios-meses-dias'>
                Tiempo en años, meses y días
              </option>
            </select>
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
            </div>

            <div className='p-6'>
              <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                <p className='text-sm font-medium text-indigo-800 mb-1'>
                  Fórmula:
                </p>
                <code className='text-indigo-700 font-mono'>
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
                          type='number'
                          id={campo.id}
                          name={campo.id}
                          step='0.01'
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

                  {modoTiempo === 'anios-simple' ? (
                    <div>
                      <label
                        htmlFor='tiempo'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Tiempo:
                      </label>
                      <div className='relative'>
                        <input
                          type='number'
                          id='tiempo'
                          name='tiempo'
                          step='0.01'
                          value={tiempo}
                          onChange={(e) => setTiempo(e.target.value)}
                          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
                            deshabilitarTiempo
                              ? 'bg-gray-100 text-gray-500'
                              : ''
                          }`}
                          placeholder='0.00'
                          required
                          disabled={deshabilitarTiempo}
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <span
                            className={`${
                              deshabilitarTiempo
                                ? 'text-gray-400'
                                : 'text-gray-500'
                            }`}
                          >
                            años
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Tiempo:
                      </label>
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='relative'>
                          <input
                            type='number'
                            id='tiempo-anios'
                            name='tiempo-anios'
                            step='1'
                            min='0'
                            value={tiempoAnios}
                            onChange={(e) => setTiempoAnios(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
                              deshabilitarTiempo
                                ? 'bg-gray-100 text-gray-500'
                                : ''
                            }`}
                            placeholder='0'
                            disabled={deshabilitarTiempo}
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <span
                              className={`${
                                deshabilitarTiempo
                                  ? 'text-gray-400'
                                  : 'text-gray-500'
                              }`}
                            >
                              años
                            </span>
                          </div>
                        </div>
                        <div className='relative'>
                          <input
                            type='number'
                            id='tiempo-meses'
                            name='tiempo-meses'
                            step='1'
                            min='0'
                            max='11'
                            value={tiempoMeses}
                            onChange={(e) => setTiempoMeses(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
                              deshabilitarTiempo
                                ? 'bg-gray-100 text-gray-500'
                                : ''
                            }`}
                            placeholder='0'
                            disabled={deshabilitarTiempo}
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <span
                              className={`${
                                deshabilitarTiempo
                                  ? 'text-gray-400'
                                  : 'text-gray-500'
                              }`}
                            >
                              meses
                            </span>
                          </div>
                        </div>
                        <div className='relative'>
                          <input
                            type='number'
                            id='tiempo-dias'
                            name='tiempo-dias'
                            step='1'
                            min='0'
                            max='30'
                            value={tiempoDias}
                            onChange={(e) => setTiempoDias(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
                              deshabilitarTiempo
                                ? 'bg-gray-100 text-gray-500'
                                : ''
                            }`}
                            placeholder='0'
                            disabled={deshabilitarTiempo}
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <span
                              className={`${
                                deshabilitarTiempo
                                  ? 'text-gray-400'
                                  : 'text-gray-500'
                              }`}
                            >
                              días
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Calcular
                </button>
              </form>

              {resultado !== null && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  {config.tipoResultado === 'retiro' ? (
                    <div className='space-y-3'>
                      <p className='text-green-800 font-medium text-lg mb-3'>
                        {config.textoResultado}
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='bg-white p-3 rounded-lg border border-green-300'>
                          <p className='text-sm text-gray-600'>
                            Monto Total Acumulado:
                          </p>
                          <p className='text-xl font-bold text-green-700'>
                            {formatoPesos(resultado.montoTotal)}
                          </p>
                        </div>
                        <div className='bg-white p-3 rounded-lg border border-green-300'>
                          <p className='text-sm text-gray-600'>
                            Interés Generado:
                          </p>
                          <p className='text-xl font-bold text-blue-700'>
                            {formatoPesos(resultado.interesGenerado)}
                          </p>
                        </div>
                        <div className='bg-white p-3 rounded-lg border border-amber-300'>
                          <p className='text-sm text-gray-600'>
                            Monto Retirado:
                          </p>
                          <p className='text-xl font-bold text-amber-700'>
                            {formatoPesos(resultado.montoRetirado)}
                          </p>
                        </div>
                        <div className='bg-white p-3 rounded-lg border border-indigo-300'>
                          <p className='text-sm text-gray-600'>
                            Monto Restante:
                          </p>
                          <p className='text-xl font-bold text-indigo-700'>
                            {formatoPesos(resultado.montoRestante)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className='text-green-800 font-medium'>
                        {config.textoResultado}
                      </p>
                      <div className='text-2xl font-bold text-green-700 mt-1'>
                        {config.esMonetario
                          ? formatoPesos(resultado)
                          : `${resultado.toFixed(2)}${config.unidadResultado}`}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
