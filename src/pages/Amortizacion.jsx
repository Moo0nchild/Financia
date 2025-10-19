// import { useState } from 'react'
// import { sistemasAmortizacion } from '../lib/data'
// import PageWrapper from '../components/PageWrapper'

// export function Amortizacion() {
//   const [resultado, setResultado] = useState(null)
//   const [tablaAmortizacion, setTablaAmortizacion] = useState([])
//   const [opcion, setOpcion] = useState('frances-cuota')
//   const [sistema, setSistema] = useState('frances')
//   const [VP, setVP] = useState('') // Valor presente/préstamo
//   const [i, setI] = useState('') // Tasa de interés
//   const [n, setN] = useState('') // Número de periodos
//   const [cuota, setCuota] = useState('') // Cuota constante
//   const [periodo, setPeriodo] = useState('') // Periodo específico

//   // Función para formatear números en formato de pesos colombianos
//   const formatoPesos = (valor) => {
//     return new Intl.NumberFormat('es-CO', {
//       style: 'currency',
//       currency: 'COP',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(valor)
//   }

//   // Función para formatear porcentajes
//   const formatoPorcentaje = (valor) => {
//     return `${(valor * 100).toFixed(2)}%`
//   }

//   // Configuración de cada opción
//   const opcionesConfig = {
//     // SISTEMA FRANCÉS
//     'frances-cuota': {
//       titulo: 'Sistema Francés - Calcular Cuota Constante',
//       descripcion:
//         'Calcula la cuota constante del sistema francés donde todas las cuotas son iguales.',
//       formula: 'Cuota = (VP × i) / (1 - (1 + i)^-n)',
//       onSubmit: onSubmitFrancesCuota,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//       ],
//       textoResultado: 'La cuota constante calculada es:',
//       unidadResultado: '$',
//       esMonetario: true,
//       generaTabla: true,
//     },
//     'frances-tabla': {
//       titulo: 'Sistema Francés - Tabla de Amortización',
//       descripcion:
//         'Genera la tabla completa de amortización del sistema francés.',
//       formula: 'Tabla completa con cuota, interés, capital y saldo por periodo',
//       onSubmit: onSubmitFrancesTabla,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//       ],
//       textoResultado: 'Tabla de amortización generada:',
//       esMonetario: false,
//       generaTabla: true,
//     },

//     // SISTEMA ALEMÁN
//     'aleman-cuota': {
//       titulo: 'Sistema Alemán - Calcular Cuota por Periodo',
//       descripcion:
//         'Calcula la cuota para un periodo específico en el sistema alemán de amortización constante.',
//       formula: 'Cuota = Amortización Constante + Interés del periodo',
//       onSubmit: onSubmitAlemanCuota,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//         {
//           id: 'periodo',
//           label: 'Periodo a calcular:',
//           value: periodo,
//           onChange: setPeriodo,
//           unidad: '',
//         },
//       ],
//       textoResultado: 'La cuota para el periodo seleccionado es:',
//       unidadResultado: '$',
//       esMonetario: true,
//       generaTabla: false,
//     },
//     'aleman-tabla': {
//       titulo: 'Sistema Alemán - Tabla de Amortización',
//       descripcion:
//         'Genera la tabla completa de amortización del sistema alemán con cuotas decrecientes.',
//       formula: 'Amortización Constante = VP / n',
//       onSubmit: onSubmitAlemanTabla,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//       ],
//       textoResultado: 'Tabla de amortización generada:',
//       esMonetario: false,
//       generaTabla: true,
//     },

//     // SISTEMA AMERICANO
//     'americano-cuota': {
//       titulo: 'Sistema Americano - Calcular Cuotas',
//       descripcion:
//         'Calcula las cuotas de intereses y el pago final del sistema americano.',
//       formula: 'Cuota = VP × i (periodos 1 a n-1), Cuota final = VP × (1 + i)',
//       onSubmit: onSubmitAmericanoCuota,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//       ],
//       textoResultado: 'Cuotas del sistema americano:',
//       esMonetario: false,
//       generaTabla: true,
//     },

//     // CÁLCULOS GENERALES
//     'calcular-tasa': {
//       titulo: 'Calcular Tasa de Interés desde Cuota',
//       descripcion:
//         'Calcula la tasa de interés implícita dado el valor del préstamo, cuota y número de periodos.',
//       formula:
//         'Método numérico para resolver: Cuota = (VP × i) / (1 - (1 + i)^-n)',
//       onSubmit: onSubmitCalcularTasa,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'cuota',
//           label: 'Cuota constante:',
//           value: cuota,
//           onChange: setCuota,
//           unidad: '$',
//         },
//         {
//           id: 'n',
//           label: 'Número de periodos:',
//           value: n,
//           onChange: setN,
//           unidad: 'periodos',
//         },
//       ],
//       textoResultado: 'La tasa de interés calculada es:',
//       unidadResultado: '%',
//       esMonetario: false,
//       generaTabla: false,
//     },
//     'calcular-periodos': {
//       titulo: 'Calcular Número de Periodos',
//       descripcion:
//         'Calcula el número de periodos necesario para pagar un préstamo dada la cuota y tasa.',
//       formula: 'n = log(Cuota / (Cuota - VP × i)) / log(1 + i)',
//       onSubmit: onSubmitCalcularPeriodos,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor del préstamo:',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'cuota',
//           label: 'Cuota constante:',
//           value: cuota,
//           onChange: setCuota,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés:',
//           value: i,
//           onChange: setI,
//           unidad: '%',
//         },
//       ],
//       textoResultado: 'El número de periodos calculado es:',
//       unidadResultado: ' periodos',
//       esMonetario: false,
//       generaTabla: false,
//     },
//   }

//   // Funciones de cálculo
//   function onSubmitFrancesCuota(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const resultadoCalculo = sistemasAmortizacion.sistemaFrances.calcularCuota(
//       parseFloat(VP),
//       tasaDecimal,
//       parseFloat(n)
//     )
//     setResultado(resultadoCalculo)

//     // Generar tabla también
//     const tabla = sistemasAmortizacion.sistemaFrances.generarTablaAmortizacion(
//       parseFloat(VP),
//       tasaDecimal,
//       parseFloat(n)
//     )
//     setTablaAmortizacion(tabla)
//   }

//   function onSubmitFrancesTabla(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const tabla = sistemasAmortizacion.sistemaFrances.generarTablaAmortizacion(
//       parseFloat(VP),
//       tasaDecimal,
//       parseFloat(n)
//     )
//     setTablaAmortizacion(tabla)
//     setResultado(tabla.length)
//   }

//   function onSubmitAlemanCuota(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const resultadoCalculo =
//       sistemasAmortizacion.sistemaAleman.calcularCuotaPeriodo(
//         parseFloat(VP),
//         tasaDecimal,
//         parseFloat(n),
//         parseFloat(periodo)
//       )
//     setResultado(resultadoCalculo)
//     setTablaAmortizacion([])
//   }

//   function onSubmitAlemanTabla(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const tabla = sistemasAmortizacion.sistemaAleman.generarTablaAmortizacion(
//       parseFloat(VP),
//       tasaDecimal,
//       parseFloat(n)
//     )
//     setTablaAmortizacion(tabla)
//     setResultado(tabla.length)
//   }

//   function onSubmitAmericanoCuota(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const tabla =
//       sistemasAmortizacion.sistemaAmericano.generarTablaAmortizacion(
//         parseFloat(VP),
//         tasaDecimal,
//         parseFloat(n)
//       )
//     setTablaAmortizacion(tabla)
//     setResultado(tabla.length)
//   }

//   function onSubmitCalcularTasa(e) {
//     e.preventDefault()
//     const resultadoCalculo = sistemasAmortizacion.calcularTasaDesdeCuota(
//       parseFloat(VP),
//       parseFloat(cuota),
//       parseFloat(n)
//     )
//     setResultado(resultadoCalculo * 100) // Convertir a porcentaje
//     setTablaAmortizacion([])
//   }

//   function onSubmitCalcularPeriodos(e) {
//     e.preventDefault()
//     const tasaDecimal = parseFloat(i) / 100
//     const resultadoCalculo = sistemasAmortizacion.calcularPeriodosDesdeCuota(
//       parseFloat(VP),
//       parseFloat(cuota),
//       tasaDecimal
//     )
//     setResultado(Math.ceil(resultadoCalculo)) // Redondear hacia arriba
//     setTablaAmortizacion([])
//   }

//   function handleSelectChange(e) {
//     const value = e.target.value
//     setOpcion(value)
//     setResultado(null)
//     setTablaAmortizacion([])

//     // Limpiar todos los inputs
//     setVP('')
//     setI('')
//     setN('')
//     setCuota('')
//     setPeriodo('')
//   }

//   function handleSistemaChange(e) {
//     const value = e.target.value
//     setSistema(value)
//     setResultado(null)
//     setTablaAmortizacion([])

//     // Cambiar a una opción por defecto según el sistema
//     if (value === 'frances') {
//       setOpcion('frances-cuota')
//     } else if (value === 'aleman') {
//       setOpcion('aleman-cuota')
//     } else if (value === 'americano') {
//       setOpcion('americano-cuota')
//     } else {
//       setOpcion('calcular-tasa')
//     }

//     // Limpiar todos los inputs
//     setVP('')
//     setI('')
//     setN('')
//     setCuota('')
//     setPeriodo('')
//   }

//   const config = opcionesConfig[opcion]

//   // Filtrar opciones según el sistema seleccionado
//   const opcionesFiltradas = {
//     frances: [
//       { value: 'frances-cuota', label: 'Calcular Cuota' },
//       { value: 'frances-tabla', label: 'Tabla Completa' },
//     ],
//     aleman: [
//       { value: 'aleman-cuota', label: 'Calcular Cuota por Periodo' },
//       { value: 'aleman-tabla', label: 'Tabla Completa' },
//     ],
//     americano: [{ value: 'americano-cuota', label: 'Calcular Cuotas' }],
//     general: [
//       { value: 'calcular-tasa', label: 'Calcular Tasa' },
//       { value: 'calcular-periodos', label: 'Calcular Periodos' },
//     ],
//   }

//   return (
//     <PageWrapper>
//       <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
//         <div className='max-w-6xl mx-auto'>
//           {/* Header */}
//           <div className='text-center mb-8'>
//             <h1 className='text-4xl font-bold text-gray-800 mb-2'>
//               Calculadora de Sistemas de Amortización
//             </h1>
//             <p className='text-gray-600'>
//               Herramienta para diferentes sistemas de amortización de préstamos
//             </p>
//           </div>

//           {/* Selectores */}
//           <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               {/* Selector de sistema de amortización */}
//               <div>
//                 <label
//                   htmlFor='sistema-select'
//                   className='block text-sm font-medium text-gray-700 mb-2'
//                 >
//                   Sistema de Amortización:
//                 </label>
//                 <select
//                   id='sistema-select'
//                   onChange={handleSistemaChange}
//                   value={sistema}
//                   className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
//                 >
//                   <option value='frances'>Sistema Francés</option>
//                   <option value='aleman'>Sistema Alemán</option>
//                   <option value='americano'>Sistema Americano</option>
//                   <option value='general'>Cálculos Generales</option>
//                 </select>
//               </div>

//               {/* Selector de cálculo específico */}
//               <div>
//                 <label
//                   htmlFor='calculo-select'
//                   className='block text-sm font-medium text-gray-700 mb-2'
//                 >
//                   Tipo de Cálculo:
//                 </label>
//                 <select
//                   id='calculo-select'
//                   onChange={handleSelectChange}
//                   value={opcion}
//                   className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
//                 >
//                   {opcionesFiltradas[sistema].map((opcionItem) => (
//                     <option key={opcionItem.value} value={opcionItem.value}>
//                       {opcionItem.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Contenedor principal */}
//           <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
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
//                 <code className='text-indigo-700 font-mono text-sm'>
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
//                 </div>

//                 <button
//                   type='submit'
//                   className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
//                 >
//                   Calcular
//                 </button>
//               </form>

//               {/* Resultado simple */}
//               {resultado !== null && !config.generaTabla && (
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

//           {/* Tabla de amortización */}
//           {tablaAmortizacion.length > 0 && (
//             <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
//               <div className='bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white'>
//                 <h2 className='text-2xl font-semibold mb-2'>
//                   Tabla de Amortización
//                 </h2>
//                 <p className='opacity-90'>
//                   Detalle de pagos, intereses, capital y saldos por periodo
//                 </p>
//               </div>

//               <div className='p-6 overflow-x-auto'>
//                 <table className='w-full text-sm text-left'>
//                   <thead className='bg-gray-50'>
//                     <tr>
//                       <th className='px-4 py-3 font-semibold text-gray-700'>
//                         Periodo
//                       </th>
//                       <th className='px-4 py-3 font-semibold text-gray-700'>
//                         Cuota
//                       </th>
//                       <th className='px-4 py-3 font-semibold text-gray-700'>
//                         Interés
//                       </th>
//                       <th className='px-4 py-3 font-semibold text-gray-700'>
//                         Capital
//                       </th>
//                       <th className='px-4 py-3 font-semibold text-gray-700'>
//                         Saldo
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tablaAmortizacion.map((fila) => (
//                       <tr
//                         key={fila.periodo}
//                         className='border-b hover:bg-gray-50'
//                       >
//                         <td className='px-4 py-3'>{fila.periodo}</td>
//                         <td className='px-4 py-3'>
//                           {formatoPesos(fila.cuota)}
//                         </td>
//                         <td className='px-4 py-3'>
//                           {formatoPesos(fila.interes)}
//                         </td>
//                         <td className='px-4 py-3'>
//                           {formatoPesos(fila.capital)}
//                         </td>
//                         <td className='px-4 py-3'>
//                           {formatoPesos(fila.saldo)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Información adicional */}
//           <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
//             <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
//               ¿Qué son los sistemas de amortización?
//             </h3>
//             <div className='text-yellow-700 space-y-2'>
//               <p>
//                 <strong>Sistema Francés:</strong> Cuotas constantes durante todo
//                 el plazo. Al inicio se pagan más intereses y menos capital.
//               </p>
//               <p>
//                 <strong>Sistema Alemán:</strong> Amortización constante con
//                 cuotas decrecientes. La parte de capital es fija, los intereses
//                 disminuyen.
//               </p>
//               <p>
//                 <strong>Sistema Americano:</strong> Solo se pagan intereses
//                 periódicamente y el capital completo al final del plazo.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   )
// }

import { useState } from 'react'
import { sistemasAmortizacion } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function Amortizacion() {
  const [resultado, setResultado] = useState(null)
  const [tablaAmortizacion, setTablaAmortizacion] = useState([])
  const [opcion, setOpcion] = useState('frances-cuota')
  const [sistema, setSistema] = useState('frances')
  const [VP, setVP] = useState('')
  const [i, setI] = useState('')
  const [n, setN] = useState('')
  const [cuota, setCuota] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [tipoCalculoAleman, setTipoCalculoAleman] = useState('tabla') // 'tabla' o 'periodo'

  // Función para normalizar inputs (acepta . y , como decimal)
  const normalizarNumero = (valor) => {
    if (!valor) return ''
    return valor.toString().replace(',', '.')
  }

  // Función para parsear números normalizados
  const parsearNumero = (valor) => {
    const normalizado = normalizarNumero(valor)
    return parseFloat(normalizado)
  }

  const formatoPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  const opcionesConfig = {
    'frances-cuota': {
      titulo: 'Sistema Francés - Calcular Cuota Constante',
      descripcion:
        'Calcula la cuota constante del sistema francés donde todas las cuotas son iguales.',
      formula: 'Cuota = VP × [i(1+i)^n] / [(1+i)^n - 1]',
      onSubmit: onSubmitFrancesCuota,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La cuota constante calculada es:',
      unidadResultado: '$',
      esMonetario: true,
      generaTabla: true,
    },
    'frances-tabla': {
      titulo: 'Sistema Francés - Tabla de Amortización',
      descripcion:
        'Genera la tabla completa de amortización del sistema francés.',
      formula: 'Tabla completa con cuota, interés, capital y saldo por periodo',
      onSubmit: onSubmitFrancesTabla,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'Tabla de amortización generada:',
      esMonetario: false,
      generaTabla: true,
    },
    'aleman-cuota': {
      titulo: 'Sistema Alemán - Calcular Cuota por Periodo',
      descripcion:
        'Calcula la cuota para un periodo específico en el sistema alemán de amortización constante.',
      formula: 'Cuota = Amortización Constante + Interés del periodo',
      onSubmit: onSubmitAlemanCuota,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
        {
          id: 'periodo',
          label: 'Periodo a calcular:',
          value: periodo,
          onChange: setPeriodo,
          unidad: '',
        },
      ],
      textoResultado: 'La cuota para el periodo seleccionado es:',
      unidadResultado: '$',
      esMonetario: true,
      generaTabla: false,
    },
    'aleman-tabla': {
      titulo: 'Sistema Alemán - Tabla de Amortización',
      descripcion:
        'Genera la tabla completa de amortización del sistema alemán con cuotas decrecientes.',
      formula: 'Amortización Constante = VP / n',
      onSubmit: onSubmitAlemanTabla,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'Tabla de amortización generada:',
      esMonetario: false,
      generaTabla: true,
    },
    'americano-cuota': {
      titulo: 'Sistema Americano - Calcular Cuotas',
      descripcion:
        'Calcula las cuotas de intereses y el pago final del sistema americano.',
      formula: 'Cuota = VP × i (periodos 1 a n), última incluye capital',
      onSubmit: onSubmitAmericanoCuota,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'Cuotas del sistema americano:',
      esMonetario: false,
      generaTabla: true,
    },
    'calcular-tasa': {
      titulo: 'Calcular Tasa de Interés desde Cuota',
      descripcion:
        'Calcula la tasa de interés implícita dado el valor del préstamo, cuota y número de periodos.',
      formula:
        'Método numérico para resolver: Cuota = (VP × i) / (1 - (1 + i)^-n)',
      onSubmit: onSubmitCalcularTasa,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'cuota',
          label: 'Cuota constante:',
          value: cuota,
          onChange: setCuota,
          unidad: '$',
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La tasa de interés calculada es:',
      unidadResultado: '%',
      esMonetario: false,
      generaTabla: false,
    },
    'calcular-periodos': {
      titulo: 'Calcular Número de Periodos',
      descripcion:
        'Calcula el número de periodos necesario para pagar un préstamo dada la cuota y tasa.',
      formula: 'n = log(Cuota / (Cuota - VP × i)) / log(1 + i)',
      onSubmit: onSubmitCalcularPeriodos,
      campos: [
        {
          id: 'VP',
          label: 'Valor del préstamo:',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'cuota',
          label: 'Cuota constante:',
          value: cuota,
          onChange: setCuota,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
        },
      ],
      textoResultado: 'El número de periodos calculado es:',
      unidadResultado: ' periodos',
      esMonetario: false,
      generaTabla: false,
    },
  }

  function onSubmitFrancesCuota(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const resultadoCalculo = sistemasAmortizacion.sistemaFrances.calcularCuota(
      parsearNumero(VP),
      tasaDecimal,
      parsearNumero(n)
    )
    setResultado(resultadoCalculo)
    const tabla = sistemasAmortizacion.sistemaFrances.generarTablaAmortizacion(
      parsearNumero(VP),
      tasaDecimal,
      parsearNumero(n)
    )
    setTablaAmortizacion(tabla)
  }

  function onSubmitFrancesTabla(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const tabla = sistemasAmortizacion.sistemaFrances.generarTablaAmortizacion(
      parsearNumero(VP),
      tasaDecimal,
      parsearNumero(n)
    )
    setTablaAmortizacion(tabla)
    setResultado(tabla.length)
  }

  function onSubmitAlemanCuota(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const resultadoCalculo =
      sistemasAmortizacion.sistemaAleman.calcularCuotaPeriodo(
        parsearNumero(VP),
        tasaDecimal,
        parsearNumero(n),
        parsearNumero(periodo)
      )
    setResultado(resultadoCalculo)
    setTablaAmortizacion([])
  }

  function onSubmitAlemanTabla(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const tabla = sistemasAmortizacion.sistemaAleman.generarTablaAmortizacion(
      parsearNumero(VP),
      tasaDecimal,
      parsearNumero(n)
    )
    setTablaAmortizacion(tabla)
    setResultado(tabla.length)
  }

  function onSubmitAmericanoCuota(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const tabla =
      sistemasAmortizacion.sistemaAmericano.generarTablaAmortizacion(
        parsearNumero(VP),
        tasaDecimal,
        parsearNumero(n)
      )
    setTablaAmortizacion(tabla)
    setResultado(tabla.length)
  }

  function onSubmitCalcularTasa(e) {
    e.preventDefault()
    const resultadoCalculo = sistemasAmortizacion.calcularTasaDesdeCuota(
      parsearNumero(VP),
      parsearNumero(cuota),
      parsearNumero(n)
    )
    setResultado(resultadoCalculo * 100)
    setTablaAmortizacion([])
  }

  function onSubmitCalcularPeriodos(e) {
    e.preventDefault()
    const tasaDecimal = parsearNumero(i) / 100
    const resultadoCalculo = sistemasAmortizacion.calcularPeriodosDesdeCuota(
      parsearNumero(VP),
      parsearNumero(cuota),
      tasaDecimal
    )
    setResultado(Math.ceil(resultadoCalculo))
    setTablaAmortizacion([])
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)
    setTablaAmortizacion([])
    setVP('')
    setI('')
    setN('')
    setCuota('')
    setPeriodo('')
  }

  function handleSistemaChange(e) {
    const value = e.target.value
    setSistema(value)
    setResultado(null)
    setTablaAmortizacion([])

    if (value === 'frances') {
      setOpcion('frances-cuota')
    } else if (value === 'aleman') {
      setOpcion('aleman-tabla')
      setTipoCalculoAleman('tabla')
    } else if (value === 'americano') {
      setOpcion('americano-cuota')
    } else {
      setOpcion('calcular-tasa')
    }

    setVP('')
    setI('')
    setN('')
    setCuota('')
    setPeriodo('')
  }

  function handleTipoCalculoAlemanChange(e) {
    const value = e.target.value
    setTipoCalculoAleman(value)
    if (value === 'tabla') {
      setOpcion('aleman-tabla')
    } else {
      setOpcion('aleman-cuota')
    }
    setResultado(null)
    setTablaAmortizacion([])
    setPeriodo('')
  }

  const config = opcionesConfig[opcion]

  const opcionesFiltradas = {
    frances: [
      { value: 'frances-cuota', label: 'Calcular Cuota' },
      { value: 'frances-tabla', label: 'Tabla Completa' },
    ],
    aleman: [
      { value: 'aleman-cuota', label: 'Calcular Cuota por Periodo' },
      { value: 'aleman-tabla', label: 'Tabla Completa' },
    ],
    americano: [{ value: 'americano-cuota', label: 'Calcular Cuotas' }],
    general: [
      { value: 'calcular-tasa', label: 'Calcular Tasa' },
      { value: 'calcular-periodos', label: 'Calcular Periodos' },
    ],
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Sistemas de Amortización
            </h1>
            <p className='text-gray-600'>
              Herramienta para diferentes sistemas de amortización de préstamos
            </p>
          </div>

          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='sistema-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Sistema de Amortización:
                </label>
                <select
                  id='sistema-select'
                  onChange={handleSistemaChange}
                  value={sistema}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='frances'>Sistema Francés</option>
                  <option value='aleman'>Sistema Alemán</option>
                  <option value='americano'>Sistema Americano</option>
                  <option value='general'>Cálculos Generales</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='calculo-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tipo de Cálculo:
                </label>
                {sistema === 'aleman' ? (
                  <select
                    id='tipo-aleman-select'
                    onChange={handleTipoCalculoAlemanChange}
                    value={tipoCalculoAleman}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                  >
                    <option value='tabla'>Tabla Completa</option>
                    <option value='periodo'>Calcular por Periodo</option>
                  </select>
                ) : (
                  <select
                    id='calculo-select'
                    onChange={handleSelectChange}
                    value={opcion}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                  >
                    {opcionesFiltradas[sistema].map((opcionItem) => (
                      <option key={opcionItem.value} value={opcionItem.value}>
                        {opcionItem.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
            </div>

            <div className='p-6'>
              <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
                <p className='text-sm font-medium text-indigo-800 mb-1'>
                  Fórmula:
                </p>
                <code className='text-indigo-700 font-mono text-sm'>
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
                          type='text'
                          id={campo.id}
                          name={campo.id}
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
                </div>

                <button
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Calcular
                </button>
              </form>

              {resultado !== null && !config.generaTabla && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>
                    {config.textoResultado}
                  </p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {config.esMonetario
                      ? formatoPesos(resultado)
                      : `${resultado.toFixed(2)}${config.unidadResultado}`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {tablaAmortizacion.length > 0 && (
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white'>
                <h2 className='text-2xl font-semibold mb-2'>
                  Tabla de Amortización
                </h2>
                <p className='opacity-90'>
                  Detalle de pagos, intereses, capital y saldos por periodo
                </p>
              </div>

              <div className='p-6 overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Periodo
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Cuota
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Interés
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Capital
                      </th>
                      <th className='px-4 py-3 font-semibold text-gray-700'>
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaAmortizacion.map((fila) => (
                      <tr
                        key={fila.periodo}
                        className='border-b hover:bg-gray-50'
                      >
                        <td className='px-4 py-3'>{fila.periodo}</td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.cuota)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.interes)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.capital)}
                        </td>
                        <td className='px-4 py-3'>
                          {formatoPesos(fila.saldo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              ¿Qué son los sistemas de amortización?
            </h3>
            <div className='text-yellow-700 space-y-2'>
              <p>
                <strong>Sistema Francés:</strong> Cuotas constantes durante todo
                el plazo. Al inicio se pagan más intereses y menos capital.
              </p>
              <p>
                <strong>Sistema Alemán:</strong> Amortización constante con
                cuotas decrecientes. La parte de capital es fija, los intereses
                disminuyen.
              </p>
              <p>
                <strong>Sistema Americano:</strong> Solo se pagan intereses
                periódicamente y el capital completo al final del plazo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
