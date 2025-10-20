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
  const [resultadoMultiple, setResultadoMultiple] = useState(null)
  const [opcion, setOpcion] = useState('general')
  const [capital, setCapital] = useState('')
  const [tasaInteres, setTasaInteres] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [montoTotal, setMontoTotal] = useState('')
  const [modoTiempo, setModoTiempo] = useState('anios-simple')
  const [tiempoAnios, setTiempoAnios] = useState('')
  const [tiempoMeses, setTiempoMeses] = useState('')
  const [tiempoDias, setTiempoDias] = useState('')

  // Estados para operaciones múltiples
  const [operaciones, setOperaciones] = useState([
    { tipo: 'final', tiempoAnios: '', tiempoMeses: '', tiempoDias: '', descripcion: '' }
  ])
  const [capitalMultiple, setCapitalMultiple] = useState('')
  const [tasaMultiple, setTasaMultiple] = useState('')

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

  const getTiempoEnAniosMultiple = (operacion) => {
    const anios = parseFloat(operacion.tiempoAnios) || 0
    const meses = parseFloat(operacion.tiempoMeses) || 0
    const dias = parseFloat(operacion.tiempoDias) || 0
    return anios + meses / 12 + dias / 360
  }

  const opcionesConfig = {
    general: {
      titulo: 'Fórmula General del Interés Simple',
      descripcion: 'El interés simple es una herramienta financiera que se usa para calcular cuánto dinero extra se paga o se gana por prestar o invertir un capital durante un tiempo determinado.',
      formula: 'Interés = Capital Inicial × Tasa de Interés × Tiempo',
      onSubmit: onSubmitGeneral,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés:',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El interés simple calculado es de:',
      unidadResultado: '$',
      esMonetario: true,
    },
    valorFuturo: {
      titulo: 'Valor Futuro (Monto)',
      descripcion: 'Calcula el monto total futuro considerando el capital inicial más el interés simple generado.',
      formula: 'Monto Final = Capital Inicial × (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitValorFuturo,
      campos: [
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés:',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    capital: {
      titulo: 'Capital (Según Monto)',
      descripcion: 'Calcula cuánto fue el capital invertido o prestado, conociendo el monto final, la tasa y el tiempo.',
      formula: 'Capital = Monto Final / (1 + Tasa de Interés × Tiempo)',
      onSubmit: onSubmitCapital,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés:',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El capital calculado es:',
      unidadResultado: '$',
      esMonetario: true,
    },
    tasa: {
      titulo: 'Tasa de Interés (Según Monto)',
      descripcion: 'Calcula qué porcentaje de interés se aplicó, conociendo capital, monto final y tiempo.',
      formula: 'Tasa de Interés = ((Monto Final / Capital Inicial) - 1) / Tiempo',
      onSubmit: onSubmitTasa,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
      ],
      textoResultado: 'La tasa de interés calculada es:',
      unidadResultado: '%',
      esMonetario: false,
    },
    tiempo: {
      titulo: 'Tiempo (Según Monto)',
      descripcion: 'Calcula cuánto tiempo duró la inversión o el préstamo, conociendo capital, monto final y tasa.',
      formula: 'Tiempo = ((Monto Final / Capital Inicial) - 1) / Tasa de Interés',
      onSubmit: onSubmitTiempo,
      campos: [
        {
          id: 'montoTotal',
          label: 'Monto Final:',
          value: montoTotal,
          onChange: setMontoTotal,
          unidad: '$',
        },
        {
          id: 'capital',
          label: 'Capital Inicial:',
          value: capital,
          onChange: setCapital,
          unidad: '$',
        },
        {
          id: 'tasaInteres',
          label: 'Tasa de Interés:',
          value: tasaInteres,
          onChange: setTasaInteres,
          unidad: '%',
        },
      ],
      textoResultado: 'El tiempo calculado es:',
      unidadResultado: ' años',
      esMonetario: false,
    },
    multiple: {
      titulo: 'Operaciones Múltiples',
      descripcion: 'Calcula el interés simple con múltiples operaciones (retiros, depósitos) durante el tiempo.',
      formula: 'Cálculo secuencial con operaciones intermedias',
      onSubmit: onSubmitMultiple,
      campos: [],
      textoResultado: 'Resultado de las operaciones:',
      esMonetario: false,
    },
    ejemplo: {
      titulo: 'Ejercicio Resuelto - Juan',
      descripcion: 'Ejemplo práctico: Juan invierte $6000 al 4.8% anual por 2.5 años y retira 3/4 de la inversión.',
      formula: 'Monto = 6000 × (1 + 0.048 × 2.5) → Retiro = 3/4 del monto',
      onSubmit: onSubmitEjemplo,
      campos: [],
      textoResultado: 'Solución del ejercicio:',
      esMonetario: false,
    }
  }

  // Funciones de cálculo básicas
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
    setResultadoMultiple(null)
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
    setResultadoMultiple(null)
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
    setResultadoMultiple(null)
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
    setResultadoMultiple(null)
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
    setResultadoMultiple(null)
  }

  // Funciones para operaciones múltiples
  function onSubmitMultiple(e) {
    e.preventDefault()
    const tasaDecimal = parseFloat(tasaMultiple) / 100
    const capitalInicial = parseFloat(capitalMultiple)

    const operacionesValidas = operaciones.filter(op => 
      getTiempoEnAniosMultiple(op) > 0 || op.tipo === 'final'
    )

    if (operacionesValidas.length === 0) {
      alert('Debe agregar al menos una operación válida')
      return
    }

    const resultadoCalculo = calcularInteresSimple.calcularOperacionMultiple({
      capitalInicial,
      tasa: tasaDecimal,
      acciones: operacionesValidas.map(op => ({
        tipo: op.tipo,
        tiempoAnios: parseFloat(op.tiempoAnios) || 0,
        tiempoMeses: parseFloat(op.tiempoMeses) || 0,
        tiempoDias: parseFloat(op.tiempoDias) || 0,
        monto: op.monto ? parseFloat(op.monto) : undefined,
        porcentaje: op.porcentaje ? parseFloat(op.porcentaje) : undefined,
        descripcion: op.descripcion || ''
      }))
    })

    setResultadoMultiple(resultadoCalculo)
    setResultado(null)
  }

  function onSubmitEjemplo(e) {
    e.preventDefault()
    const resultadoCalculo = calcularInteresSimple.resolverEjercicioJuan()
    setResultadoMultiple(resultadoCalculo)
    setResultado(null)
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)
    setResultadoMultiple(null)

    // Limpiar todos los inputs
    setCapital('')
    setTasaInteres('')
    setTiempo('')
    setMontoTotal('')
    setTiempoAnios('')
    setTiempoMeses('')
    setTiempoDias('')
    setCapitalMultiple('')
    setTasaMultiple('')
    setOperaciones([{ tipo: 'final', tiempoAnios: '', tiempoMeses: '', tiempoDias: '', descripcion: '' }])
  }

  function handleModoTiempoChange(e) {
    setModoTiempo(e.target.value)
    setResultado(null)
    setTiempo('')
    setTiempoAnios('')
    setTiempoMeses('')
    setTiempoDias('')
  }

  // Funciones para manejar operaciones múltiples
  const agregarOperacion = () => {
    setOperaciones([...operaciones, { 
      tipo: 'final', 
      tiempoAnios: '', 
      tiempoMeses: '', 
      tiempoDias: '', 
      monto: '', 
      porcentaje: '', 
      descripcion: '' 
    }])
  }

  const eliminarOperacion = (index) => {
    if (operaciones.length > 1) {
      const nuevasOperaciones = operaciones.filter((_, i) => i !== index)
      setOperaciones(nuevasOperaciones)
    }
  }

  const actualizarOperacion = (index, campo, valor) => {
    const nuevasOperaciones = [...operaciones]
    nuevasOperaciones[index][campo] = valor
    setOperaciones(nuevasOperaciones)
  }

  const config = opcionesConfig[opcion]
  const deshabilitarTiempo = opcion === 'tiempo'

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Interés Simple
            </h1>
            <p className='text-gray-600'>
              Herramienta para diferentes cálculos de interés simple incluyendo operaciones múltiples
            </p>
          </div>

          {/* Selector de modo */}
          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <label htmlFor='mode-select' className='block text-sm font-medium text-gray-700 mb-2'>
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
              <option value='multiple'>Operaciones múltiples</option>
              <option value='ejemplo'>Ejercicio resuelto - Juan</option>
            </select>

            {opcion !== 'multiple' && opcion !== 'ejemplo' && (
              <>
                <label htmlFor='time-mode-select' className='block text-sm font-medium text-gray-700 mb-2'>
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
                  <option value='anios-meses-dias'>Tiempo en años, meses y días</option>
                </select>
              </>
            )}
          </div>

          {/* Contenedor principal */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
            </div>

            <div className='p-6'>
              {/* Fórmula */}
              <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                <p className='text-sm font-medium text-indigo-800 mb-1'>Fórmula:</p>
                <code className='text-indigo-700 font-mono text-sm'>{config.formula}</code>
              </div>

              {/* Formulario según la opción seleccionada */}
              {opcion !== 'multiple' && opcion !== 'ejemplo' ? (
                <form onSubmit={config.onSubmit} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {config.campos.map((campo) => (
                      <div key={campo.id}>
                        <label htmlFor={campo.id} className='block text-sm font-medium text-gray-700 mb-1'>
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
                        <label htmlFor='tiempo' className='block text-sm font-medium text-gray-700 mb-1'>
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
                              deshabilitarTiempo ? 'bg-gray-100 text-gray-500' : ''
                            }`}
                            placeholder='0.00'
                            required
                            disabled={deshabilitarTiempo}
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <span className={deshabilitarTiempo ? 'text-gray-400' : 'text-gray-500'}>años</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Tiempo:</label>
                        <div className='grid grid-cols-3 gap-4'>
                          {['Años', 'Meses', 'Días'].map((unidad, index) => (
                            <div key={unidad} className='relative'>
                              <input
                                type='number'
                                step='1'
                                min='0'
                                value={index === 0 ? tiempoAnios : index === 1 ? tiempoMeses : tiempoDias}
                                onChange={(e) => 
                                  index === 0 ? setTiempoAnios(e.target.value) : 
                                  index === 1 ? setTiempoMeses(e.target.value) : 
                                  setTiempoDias(e.target.value)
                                }
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 ${
                                  deshabilitarTiempo ? 'bg-gray-100 text-gray-500' : ''
                                }`}
                                placeholder='0'
                                disabled={deshabilitarTiempo}
                                max={index === 1 ? '11' : index === 2 ? '30' : undefined}
                              />
                              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                                <span className={deshabilitarTiempo ? 'text-gray-400' : 'text-gray-500'}>
                                  {unidad.toLowerCase()}
                                </span>
                              </div>
                            </div>
                          ))}
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
              ) : opcion === 'multiple' ? (
                <form onSubmit={onSubmitMultiple} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Capital Inicial:</label>
                      <div className='relative'>
                        <input
                          type='number'
                          step='0.01'
                          value={capitalMultiple}
                          onChange={(e) => setCapitalMultiple(e.target.value)}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12'
                          placeholder='0'
                          required
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <span className='text-gray-500'>$</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Tasa de Interés Anual:</label>
                      <div className='relative'>
                        <input
                          type='number'
                          step='0.01'
                          value={tasaMultiple}
                          onChange={(e) => setTasaMultiple(e.target.value)}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12'
                          placeholder='0'
                          required
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <span className='text-gray-500'>%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold text-gray-800'>Operaciones</h3>
                      <button
                        type='button'
                        onClick={agregarOperacion}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'
                      >
                        + Agregar Operación
                      </button>
                    </div>

                    {operaciones.map((operacion, index) => (
                      <div key={index} className='border border-gray-200 rounded-lg p-4 bg-gray-50'>
                        <div className='flex justify-between items-center mb-3'>
                          <h4 className='font-medium text-gray-700'>Operación {index + 1}</h4>
                          {operaciones.length > 1 && (
                            <button
                              type='button'
                              onClick={() => eliminarOperacion(index)}
                              className='text-red-500 hover:text-red-700'
                            >
                              ✕ Eliminar
                            </button>
                          )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Tipo de Operación:</label>
                            <select
                              value={operacion.tipo}
                              onChange={(e) => actualizarOperacion(index, 'tipo', e.target.value)}
                              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                            >
                              <option value='final'>Solo interés (final)</option>
                              <option value='retiro'>Retiro</option>
                              <option value='deposito'>Depósito</option>
                            </select>
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Descripción:</label>
                            <input
                              type='text'
                              value={operacion.descripcion}
                              onChange={(e) => actualizarOperacion(index, 'descripcion', e.target.value)}
                              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                              placeholder='Descripción opcional'
                            />
                          </div>
                        </div>

                        <div className='grid grid-cols-3 gap-4 mb-3'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Años:</label>
                            <input
                              type='number'
                              step='1'
                              min='0'
                              value={operacion.tiempoAnios}
                              onChange={(e) => actualizarOperacion(index, 'tiempoAnios', e.target.value)}
                              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                              placeholder='0'
                            />
                          </div>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Meses:</label>
                            <input
                              type='number'
                              step='1'
                              min='0'
                              max='11'
                              value={operacion.tiempoMeses}
                              onChange={(e) => actualizarOperacion(index, 'tiempoMeses', e.target.value)}
                              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                              placeholder='0'
                            />
                          </div>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Días:</label>
                            <input
                              type='number'
                              step='1'
                              min='0'
                              max='30'
                              value={operacion.tiempoDias}
                              onChange={(e) => actualizarOperacion(index, 'tiempoDias', e.target.value)}
                              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                              placeholder='0'
                            />
                          </div>
                        </div>

                        {(operacion.tipo === 'retiro' || operacion.tipo === 'deposito') && (
                          <div className='grid grid-cols-2 gap-4'>
                            <div>
                              <label className='block text-sm font-medium text-gray-700 mb-1'>Monto fijo:</label>
                              <div className='relative'>
                                <input
                                  type='number'
                                  step='0.01'
                                  value={operacion.monto}
                                  onChange={(e) => actualizarOperacion(index, 'monto', e.target.value)}
                                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-12'
                                  placeholder='0'
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                                  <span className='text-gray-500'>$</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className='block text-sm font-medium text-gray-700 mb-1'>Porcentaje:</label>
                              <div className='relative'>
                                <input
                                  type='number'
                                  step='0.01'
                                  value={operacion.porcentaje}
                                  onChange={(e) => actualizarOperacion(index, 'porcentaje', e.target.value)}
                                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-12'
                                  placeholder='0'
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                                  <span className='text-gray-500'>%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Calcular Operaciones
                  </button>
                </form>
              ) : (
                <form onSubmit={onSubmitEjemplo}>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                    <p className='text-blue-800'>
                      <strong>Ejercicio:</strong> Juan invierte $6000 en una cuenta de ahorros que paga un interés del 4.8% anual. Después de 2 años y medio, decide retirar la 3/4 de la inversión. ¿Cuánto dinero habrá acumulado?
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Resolver Ejercicio
                  </button>
                </form>
              )}

              {/* Resultados básicos */}
              {resultado !== null && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>{config.textoResultado}</p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {config.esMonetario
                      ? formatoPesos(resultado)
                      : `${resultado.toFixed(2)}${config.unidadResultado}`}
                  </div>
                </div>
              )}

              {/* Resultados múltiples */}
              {resultadoMultiple && (
                <div className='mt-6 space-y-4'>
                  <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <h3 className='text-lg font-semibold text-green-800 mb-2'>Resumen Final</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-green-700'><strong>Capital Inicial:</strong> {formatoPesos(resultadoMultiple.capitalInicial)}</p>
                        <p className='text-green-700'><strong>Tasa de Interés:</strong> {(resultadoMultiple.tasa * 100).toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className='text-green-700'><strong>Capital Final:</strong> {formatoPesos(resultadoMultiple.capitalFinal)}</p>
                        <p className='text-green-700'><strong>Interés Total:</strong> {formatoPesos(resultadoMultiple.interesTotal)}</p>
                      </div>
                    </div>
                    {resultadoMultiple.descripcion && (
                      <p className='text-green-700 mt-2'><strong>Explicación:</strong> {resultadoMultiple.descripcion}</p>
                    )}
                  </div>

                  {resultadoMultiple.operaciones && (
                    <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                      <h3 className='bg-gray-50 px-4 py-3 font-semibold text-gray-800'>Detalle de Operaciones</h3>
                      <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                          <thead className='bg-gray-100'>
                            <tr>
                              <th className='px-4 py-2 text-left'>Período</th>
                              <th className='px-4 py-2 text-left'>Descripción</th>
                              <th className='px-4 py-2 text-right'>Capital Inicial</th>
                              <th className='px-4 py-2 text-right'>Interés</th>
                              <th className='px-4 py-2 text-right'>Operación</th>
                              <th className='px-4 py-2 text-right'>Capital Final</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultadoMultiple.operaciones.map((op, index) => (
                              <tr key={index} className='border-t border-gray-200'>
                                <td className='px-4 py-2'>{op.periodo}</td>
                                <td className='px-4 py-2'>{op.descripcion}</td>
                                <td className='px-4 py-2 text-right'>{formatoPesos(op.capitalInicial)}</td>
                                <td className='px-4 py-2 text-right'>{formatoPesos(op.interesGenerado)}</td>
                                <td className='px-4 py-2 text-right'>
                                  {op.montoOperacion ? formatoPesos(op.montoOperacion) : '-'}
                                </td>
                                <td className='px-4 py-2 text-right'>{formatoPesos(op.capitalFinal)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
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