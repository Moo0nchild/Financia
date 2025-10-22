// import { useState } from 'react'
// import { calcularGradientes, conversionesTasa, conversionesTasa1 } from '../lib/data'
// import PageWrapper from '../components/PageWrapper'

// export function GradientesSeriesVariables() {
//   const [resultado, setResultado] = useState(null)
//   const [opcion, setOpcion] = useState('vp-aritmetico')
//   const [tipoGradiente, setTipoGradiente] = useState('aritmetico')
//   const [A, setA] = useState('')
//   const [G, setG] = useState('')
//   const [g, setg] = useState('')
//   const [i, setI] = useState('')
//   const [n, setN] = useState('')
//   const [VP, setVP] = useState('')
//   const [VF, setVF] = useState('')
//   const [periodoGradiente, setPeriodoGradiente] = useState('mensual')

//   const normalizarNumero = (valor) => {
//     if (!valor) return ''
//     return valor.toString().replace(',', '.')
//   }

//   const parsearNumero = (valor) => {
//     const normalizado = normalizarNumero(valor)
//     return parseFloat(normalizado)
//   }

//   const ajustarTasaSegunPeriodo = (tasaPorcentual, periodo) => {
//     return conversionesTasa1.convertirTasaAnual(tasaPorcentual, periodo)
//   }

//   const ajustarTasaCrecimientoSegunPeriodo = (
//     tasaCrecimientoPorcentual,
//     periodo
//   ) => {
//     return conversionesTasa1.convertirTasaCrecimientoAnual(
//       tasaCrecimientoPorcentual,
//       periodo
//     )
//   }

//   const formatoPesos = (valor) => {
//     return new Intl.NumberFormat('es-CO', {
//       style: 'currency',
//       currency: 'COP',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(valor)
//   }

//   const opcionesConfig = {
//     // GRADIENTE ARITMÉTICO - VALOR PRESENTE/FUTURO
//     'vp-aritmetico': {
//       titulo: 'Valor Presente - Gradiente Aritmético',
//       descripcion:
//         'Calcula el valor presente de una serie con incrementos constantes en cada periodo.',
//       formula: 'VP = A × (P/A) + G × (P/G)',
//       onSubmit: onSubmitVPAritmetico,
//       campos: [
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'G',
//           label: 'Gradiente aritmético (G):',
//           value: G,
//           onChange: setG,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El valor presente calculado es:',
//       esMonetario: true,
//     },
//     'vf-aritmetico': {
//       titulo: 'Valor Futuro - Gradiente Aritmético',
//       descripcion:
//         'Calcula el valor futuro de una serie con incrementos constantes en cada periodo.',
//       formula: 'VF = A × (F/A) + G × (F/G)',
//       onSubmit: onSubmitVFAritmetico,
//       campos: [
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'G',
//           label: 'Gradiente aritmético (G):',
//           value: G,
//           onChange: setG,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El valor futuro calculado es:',
//       esMonetario: true,
//     },

//     // GRADIENTE ARITMÉTICO - CÁLCULOS DESDE VALOR PRESENTE
//     'A-desde-vp-aritmetico': {
//       titulo: 'Primera Cuota (A) - Gradiente Aritmético',
//       descripcion:
//         'Calcula la primera cuota dado el valor presente, gradiente, tasa y periodos.',
//       formula: 'A = (VP - G × (P/G)) / (P/A)',
//       onSubmit: onSubmitADesdeVPAritmetico,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor presente (VP):',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'G',
//           label: 'Gradiente aritmético (G):',
//           value: G,
//           onChange: setG,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La primera cuota (A) calculada es:',
//       esMonetario: true,
//     },
//     'G-desde-vp-aritmetico': {
//       titulo: 'Gradiente (G) - Gradiente Aritmético',
//       descripcion:
//         'Calcula el gradiente aritmético dado el valor presente, primera cuota, tasa y periodos.',
//       formula: 'G = (VP - A × (P/A)) / (P/G)',
//       onSubmit: onSubmitGDesdeVPAritmetico,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor presente (VP):',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El gradiente aritmético (G) calculado es:',
//       esMonetario: true,
//     },

//     // GRADIENTE ARITMÉTICO - CÁLCULOS DESDE VALOR FUTURO
//     'A-desde-vf-aritmetico': {
//       titulo: 'Primera Cuota (A) desde VF - Gradiente Aritmético',
//       descripcion:
//         'Calcula la primera cuota dado el valor futuro, gradiente, tasa y periodos.',
//       formula: 'A = (VF - G × (F/G)) / (F/A)',
//       onSubmit: onSubmitADesdeVFAritmetico,
//       campos: [
//         {
//           id: 'VF',
//           label: 'Valor futuro (VF):',
//           value: VF,
//           onChange: setVF,
//           unidad: '$',
//         },
//         {
//           id: 'G',
//           label: 'Gradiente aritmético (G):',
//           value: G,
//           onChange: setG,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La primera cuota (A) calculada es:',
//       esMonetario: true,
//     },
//     'G-desde-vf-aritmetico': {
//       titulo: 'Gradiente (G) desde VF - Gradiente Aritmético',
//       descripcion:
//         'Calcula el gradiente aritmético dado el valor futuro, primera cuota, tasa y periodos.',
//       formula: 'G = (VF - A × (F/A)) / (F/G)',
//       onSubmit: onSubmitGDesdeVFAritmetico,
//       campos: [
//         {
//           id: 'VF',
//           label: 'Valor futuro (VF):',
//           value: VF,
//           onChange: setVF,
//           unidad: '$',
//         },
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El gradiente aritmético (G) calculado es:',
//       esMonetario: true,
//     },

//     // GRADIENTE GEOMÉTRICO - VALOR PRESENTE/FUTURO
//     'vp-geometrico': {
//       titulo: 'Valor Presente - Gradiente Geométrico',
//       descripcion:
//         'Calcula el valor presente de una serie con incrementos porcentuales constantes.',
//       formula: 'VP = A × [1 - ((1+g)/(1+i))^n] / (i - g)',
//       onSubmit: onSubmitVPGeometrico,
//       campos: [
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'g',
//           label: 'Tasa de crecimiento anual (g):',
//           value: g,
//           onChange: setg,
//           unidad: '%',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El valor presente calculado es:',
//       esMonetario: true,
//     },
//     'vf-geometrico': {
//       titulo: 'Valor Futuro - Gradiente Geométrico',
//       descripcion:
//         'Calcula el valor futuro de una serie con incrementos porcentuales constantes.',
//       formula: 'VF = A × [(1+i)^n - (1+g)^n] / (i - g)',
//       onSubmit: onSubmitVFGeometrico,
//       campos: [
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'g',
//           label: 'Tasa de crecimiento anual (g):',
//           value: g,
//           onChange: setg,
//           unidad: '%',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'El valor futuro calculado es:',
//       esMonetario: true,
//     },

//     // GRADIENTE GEOMÉTRICO - CÁLCULOS DESDE VALOR PRESENTE
//     'A-desde-vp-geometrico': {
//       titulo: 'Primera Cuota (A) - Gradiente Geométrico',
//       descripcion:
//         'Calcula la primera cuota dado el valor presente, tasa de crecimiento, tasa de interés y periodos.',
//       formula: 'A = VP × (i - g) / [1 - ((1+g)/(1+i))^n]',
//       onSubmit: onSubmitADesdeVPGeometrico,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor presente (VP):',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'g',
//           label: 'Tasa de crecimiento anual (g):',
//           value: g,
//           onChange: setg,
//           unidad: '%',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La primera cuota (A) calculada es:',
//       esMonetario: true,
//     },
//     'g-desde-vp-geometrico': {
//       titulo: 'Tasa de Crecimiento (g) - Gradiente Geométrico',
//       descripcion:
//         'Calcula la tasa de crecimiento dado el valor presente, primera cuota, tasa de interés y periodos.',
//       formula: 'Método numérico para encontrar g',
//       onSubmit: onSubmitGDesdeVPGeometrico,
//       campos: [
//         {
//           id: 'VP',
//           label: 'Valor presente (VP):',
//           value: VP,
//           onChange: setVP,
//           unidad: '$',
//         },
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La tasa de crecimiento anual (g) calculada es:',
//       esMonetario: false,
//       unidadResultado: '%',
//     },

//     // GRADIENTE GEOMÉTRICO - CÁLCULOS DESDE VALOR FUTURO
//     'A-desde-vf-geometrico': {
//       titulo: 'Primera Cuota (A) desde VF - Gradiente Geométrico',
//       descripcion:
//         'Calcula la primera cuota dado el valor futuro, tasa de crecimiento, tasa de interés y periodos.',
//       formula: 'A = VF × (i - g) / [(1+i)^n - (1+g)^n]',
//       onSubmit: onSubmitADesdeVFGeometrico,
//       campos: [
//         {
//           id: 'VF',
//           label: 'Valor futuro (VF):',
//           value: VF,
//           onChange: setVF,
//           unidad: '$',
//         },
//         {
//           id: 'g',
//           label: 'Tasa de crecimiento anual (g):',
//           value: g,
//           onChange: setg,
//           unidad: '%',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La primera cuota (A) calculada es:',
//       esMonetario: true,
//     },
//     'g-desde-vf-geometrico': {
//       titulo: 'Tasa de Crecimiento (g) desde VF - Gradiente Geométrico',
//       descripcion:
//         'Calcula la tasa de crecimiento dado el valor futuro, primera cuota, tasa de interés y periodos.',
//       formula: 'Método numérico para encontrar g',
//       onSubmit: onSubmitGDesdeVFGeometrico,
//       campos: [
//         {
//           id: 'VF',
//           label: 'Valor futuro (VF):',
//           value: VF,
//           onChange: setVF,
//           unidad: '$',
//         },
//         {
//           id: 'A',
//           label: 'Primera cuota (A):',
//           value: A,
//           onChange: setA,
//           unidad: '$',
//         },
//         {
//           id: 'i',
//           label: 'Tasa de interés anual:',
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
//       textoResultado: 'La tasa de crecimiento anual (g) calculada es:',
//       esMonetario: false,
//       unidadResultado: '%',
//     },
//   }

//   // Funciones de cálculo - GRADIENTE ARITMÉTICO
//   function onSubmitVPAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.valorPresenteAritmetico(
//       parsearNumero(A),
//       parsearNumero(G),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitVFAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.valorFuturoAritmetico(
//       parsearNumero(A),
//       parsearNumero(G),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitADesdeVPAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularADesdeVPAritmetico(
//       parsearNumero(VP),
//       parsearNumero(G),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitGDesdeVPAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularGDesdeVPAritmetico(
//       parsearNumero(VP),
//       parsearNumero(A),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitADesdeVFAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularADesdeVFAritmetico(
//       parsearNumero(VF),
//       parsearNumero(G),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitGDesdeVFAritmetico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularGDesdeVFAritmetico(
//       parsearNumero(VF),
//       parsearNumero(A),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   // Funciones de cálculo - GRADIENTE GEOMÉTRICO
//   function onSubmitVPGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
//       parsearNumero(g),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.valorPresenteGeometrico(
//       parsearNumero(A),
//       crecimientoAjustado,
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitVFGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
//       parsearNumero(g),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.valorFuturoGeometrico(
//       parsearNumero(A),
//       crecimientoAjustado,
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitADesdeVPGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
//       parsearNumero(g),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularADesdeVPGeometrico(
//       parsearNumero(VP),
//       crecimientoAjustado,
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitGDesdeVPGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularGDesdeVPGeometrico(
//       parsearNumero(VP),
//       parsearNumero(A),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     // Convertir la tasa de crecimiento de vuelta a anual para mostrar
//     const tasaCrecimientoAnual =
//       (Math.pow(
//         1 + resultadoCalculo,
//         periodoGradiente === 'mensual'
//           ? 12
//           : periodoGradiente === 'trimestral'
//           ? 4
//           : periodoGradiente === 'semestral'
//           ? 2
//           : periodoGradiente === 'diaria'
//           ? 365
//           : 1
//       ) -
//         1) *
//       100
//     setResultado(tasaCrecimientoAnual)
//   }

//   function onSubmitADesdeVFGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
//       parsearNumero(g),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularADesdeVFGeometrico(
//       parsearNumero(VF),
//       crecimientoAjustado,
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     setResultado(resultadoCalculo)
//   }

//   function onSubmitGDesdeVFGeometrico(e) {
//     e.preventDefault()
//     const tasaAjustada = ajustarTasaSegunPeriodo(
//       parsearNumero(i),
//       periodoGradiente
//     )
//     const resultadoCalculo = calcularGradientes.calcularGDesdeVFGeometrico(
//       parsearNumero(VF),
//       parsearNumero(A),
//       tasaAjustada,
//       parsearNumero(n),
//       periodoGradiente
//     )
//     // Convertir la tasa de crecimiento de vuelta a anual para mostrar
//     const tasaCrecimientoAnual =
//       (Math.pow(
//         1 + resultadoCalculo,
//         periodoGradiente === 'mensual'
//           ? 12
//           : periodoGradiente === 'trimestral'
//           ? 4
//           : periodoGradiente === 'semestral'
//           ? 2
//           : periodoGradiente === 'diaria'
//           ? 365
//           : 1
//       ) -
//         1) *
//       100
//     setResultado(tasaCrecimientoAnual)
//   }

//   function handleSelectChange(e) {
//     const value = e.target.value
//     setOpcion(value)
//     setResultado(null)
//     setA('')
//     setG('')
//     setg('')
//     setI('')
//     setN('')
//     setVP('')
//     setVF('')
//   }

//   function handleTipoGradienteChange(e) {
//     const value = e.target.value
//     setTipoGradiente(value)
//     setResultado(null)
//     if (value === 'aritmetico') {
//       setOpcion('vp-aritmetico')
//     } else {
//       setOpcion('vp-geometrico')
//     }
//     setA('')
//     setG('')
//     setg('')
//     setI('')
//     setN('')
//     setVP('')
//     setVF('')
//   }

//   const config = opcionesConfig[opcion]

//   const opcionesFiltradas = {
//     aritmetico: [
//       { value: 'vp-aritmetico', label: 'Valor Presente' },
//       { value: 'vf-aritmetico', label: 'Valor Futuro' },
//       { value: 'A-desde-vp-aritmetico', label: 'A desde VP' },
//       { value: 'G-desde-vp-aritmetico', label: 'G desde VP' },
//       { value: 'A-desde-vf-aritmetico', label: 'A desde VF' },
//       { value: 'G-desde-vf-aritmetico', label: 'G desde VF' },
//     ],
//     geometrico: [
//       { value: 'vp-geometrico', label: 'Valor Presente' },
//       { value: 'vf-geometrico', label: 'Valor Futuro' },
//       { value: 'A-desde-vp-geometrico', label: 'A desde VP' },
//       { value: 'g-desde-vp-geometrico', label: 'g desde VP' },
//       { value: 'A-desde-vf-geometrico', label: 'A desde VF' },
//       { value: 'g-desde-vf-geometrico', label: 'g desde VF' },
//     ],
//   }

//   return (
//     <PageWrapper>
//       <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
//         <div className='max-w-4xl mx-auto'>
//           <div className='text-center mb-8'>
//             <h1 className='text-4xl font-bold text-gray-800 mb-2'>
//               Calculadora de Gradientes y Series Variables
//             </h1>
//             <p className='text-gray-600'>
//               Herramienta para cálculos de series con incrementos aritméticos y
//               geométricos
//             </p>
//           </div>

//           <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//               <div>
//                 <label
//                   htmlFor='tipo-gradiente'
//                   className='block text-sm font-medium text-gray-700 mb-2'
//                 >
//                   Tipo de Gradiente:
//                 </label>
//                 <select
//                   id='tipo-gradiente'
//                   onChange={handleTipoGradienteChange}
//                   value={tipoGradiente}
//                   className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
//                 >
//                   <option value='aritmetico'>Gradiente Aritmético</option>
//                   <option value='geometrico'>Gradiente Geométrico</option>
//                 </select>
//               </div>

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
//                   {opcionesFiltradas[tipoGradiente].map((opcionItem) => (
//                     <option key={opcionItem.value} value={opcionItem.value}>
//                       {opcionItem.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label
//                   htmlFor='periodo-gradiente'
//                   className='block text-sm font-medium text-gray-700 mb-2'
//                 >
//                   Periodo del Gradiente:
//                 </label>
//                 <select
//                   id='periodo-gradiente'
//                   onChange={(e) => setPeriodoGradiente(e.target.value)}
//                   value={periodoGradiente}
//                   className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
//                 >
//                   <option value='mensual'>Mensual</option>
//                   <option value='trimestral'>Trimestral</option>
//                   <option value='semestral'>Semestral</option>
//                   <option value='anual'>Anual</option>
//                   <option value='diaria'>Diaria</option>
//                 </select>
//               </div>
//             </div>

//             <div className='mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg'>
//               <p className='text-indigo-700 text-sm'>
//                 <strong>Periodo seleccionado:</strong>{' '}
//                 {periodoGradiente.charAt(0).toUpperCase() +
//                   periodoGradiente.slice(1)}
//                 {i && (
//                   <span className='ml-2'>
//                     • Tasa {periodoGradiente}:{' '}
//                     {(
//                       ajustarTasaSegunPeriodo(
//                         parsearNumero(i),
//                         periodoGradiente
//                       ) * 100
//                     ).toFixed(4)}
//                     %
//                   </span>
//                 )}
//                 {g && tipoGradiente === 'geometrico' && (
//                   <span className='ml-2'>
//                     • Crecimiento {periodoGradiente}:{' '}
//                     {(
//                       ajustarTasaCrecimientoSegunPeriodo(
//                         parsearNumero(g),
//                         periodoGradiente
//                       ) * 100
//                     ).toFixed(4)}
//                     %
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>

//           <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
//             <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
//               <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
//               <p className='opacity-90'>{config.descripcion}</p>
//               <div className='mt-2 bg-purple-500 bg-opacity-20 p-2 rounded'>
//                 <p className='text-sm'>
//                   <strong>Periodo:</strong>{' '}
//                   {periodoGradiente.charAt(0).toUpperCase() +
//                     periodoGradiente.slice(1)}
//                 </p>
//               </div>
//             </div>

//             <div className='p-6'>
//               <div className='bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6'>
//                 <p className='text-sm font-medium text-indigo-800 mb-1'>
//                   Fórmula:
//                 </p>
//                 <code className='text-indigo-700 font-mono text-sm'>
//                   {config.formula}
//                 </code>
//               </div>

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
//                           type='text'
//                           id={campo.id}
//                           name={campo.id}
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

//               {resultado !== null && (
//                 <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
//                   <p className='text-green-800 font-medium'>
//                     {config.textoResultado}
//                   </p>
//                   <div className='text-2xl font-bold text-green-700 mt-1'>
//                     {config.esMonetario
//                       ? formatoPesos(resultado)
//                       : `${resultado.toFixed(2)}${
//                           config.unidadResultado || ''
//                         }`}
//                   </div>
//                   <p className='text-green-600 text-sm mt-2'>
//                     Cálculo realizado con periodo {periodoGradiente}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
//             <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
//               ¿Qué son los gradientes?
//             </h3>
//             <div className='text-yellow-700 space-y-2'>
//               <p>
//                 <strong>Gradiente Aritmético:</strong> Serie de pagos que
//                 aumentan o disminuyen en una cantidad constante cada periodo.
//                 Ejemplo: $100, $120, $140, $160... (G = $20)
//               </p>
//               <p>
//                 <strong>Gradiente Geométrico:</strong> Serie de pagos que
//                 aumentan o disminuyen en un porcentaje constante cada periodo.
//                 Ejemplo: $100, $110, $121, $133.10... (g = 10%)
//               </p>
//               <p className='mt-2 text-yellow-800 font-medium'>
//                 Periodo actual:{' '}
//                 {periodoGradiente.charAt(0).toUpperCase() +
//                   periodoGradiente.slice(1)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   )
// }

import { useState } from 'react'
import { calcularGradientes, conversionesTasa1 } from '../lib/data'
import PageWrapper from '../components/PageWrapper'

export function GradientesSeriesVariables() {
  const [resultado, setResultado] = useState(null)
  const [opcion, setOpcion] = useState('vp-aritmetico')
  const [tipoGradiente, setTipoGradiente] = useState('aritmetico')
  const [A, setA] = useState('')
  const [G, setG] = useState('')
  const [g, setg] = useState('')
  const [i, setI] = useState('')
  const [n, setN] = useState('')
  const [VP, setVP] = useState('')
  const [VF, setVF] = useState('')
  const [periodoGradiente, setPeriodoGradiente] = useState('mensual')
  const [periodoTasa, setPeriodoTasa] = useState('anual') // NUEVO
  const [periodoTasaCrecimiento, setPeriodoTasaCrecimiento] = useState('anual') // NUEVO

  const normalizarNumero = (valor) => {
    if (!valor) return ''
    return valor.toString().replace(',', '.')
  }

  const parsearNumero = (valor) => {
    const normalizado = normalizarNumero(valor)
    return parseFloat(normalizado)
  }

  // MODIFICADO: Ahora considera el periodo de la tasa ingresada
  const ajustarTasaSegunPeriodo = (
    tasaPorcentual,
    periodoDestino,
    periodoOrigen
  ) => {
    const tasaDecimal = tasaPorcentual / 100

    // Si el periodo origen y destino son iguales, solo convertir a decimal
    if (periodoOrigen === periodoDestino) {
      return tasaDecimal
    }

    // Convertir primero a tasa efectiva anual
    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }

    const tasaEfectivaAnual =
      Math.pow(1 + tasaDecimal, periodosPorAno[periodoOrigen]) - 1

    // Luego convertir al periodo destino
    const tasaDestino =
      Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAno[periodoDestino]) - 1

    return tasaDestino
  }

  // MODIFICADO: Para tasa de crecimiento
  const ajustarTasaCrecimientoSegunPeriodo = (
    tasaCrecimientoPorcentual,
    periodoDestino,
    periodoOrigen
  ) => {
    const tasaDecimal = tasaCrecimientoPorcentual / 100

    if (periodoOrigen === periodoDestino) {
      return tasaDecimal
    }

    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }

    const tasaEfectivaAnual =
      Math.pow(1 + tasaDecimal, periodosPorAno[periodoOrigen]) - 1
    const tasaDestino =
      Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAno[periodoDestino]) - 1

    return tasaDestino
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
    'vp-aritmetico': {
      titulo: 'Valor Presente - Gradiente Aritmético',
      descripcion:
        'Calcula el valor presente de una serie con incrementos constantes en cada periodo.',
      formula: 'VP = A × (P/A) + G × (P/G)',
      onSubmit: onSubmitVPAritmetico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor presente calculado es:',
      esMonetario: true,
    },
    'vf-aritmetico': {
      titulo: 'Valor Futuro - Gradiente Aritmético',
      descripcion:
        'Calcula el valor futuro de una serie con incrementos constantes en cada periodo.',
      formula: 'VF = A × (F/A) + G × (F/G)',
      onSubmit: onSubmitVFAritmetico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      esMonetario: true,
    },
    'A-desde-vp-aritmetico': {
      titulo: 'Primera Cuota (A) - Gradiente Aritmético',
      descripcion:
        'Calcula la primera cuota dado el valor presente, gradiente, tasa y periodos.',
      formula: 'A = (VP - G × (P/G)) / (P/A)',
      onSubmit: onSubmitADesdeVPAritmetico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      esMonetario: true,
    },
    'G-desde-vp-aritmetico': {
      titulo: 'Gradiente (G) - Gradiente Aritmético',
      descripcion:
        'Calcula el gradiente aritmético dado el valor presente, primera cuota, tasa y periodos.',
      formula: 'G = (VP - A × (P/A)) / (P/G)',
      onSubmit: onSubmitGDesdeVPAritmetico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El gradiente aritmético (G) calculado es:',
      esMonetario: true,
    },
    'A-desde-vf-aritmetico': {
      titulo: 'Primera Cuota (A) desde VF - Gradiente Aritmético',
      descripcion:
        'Calcula la primera cuota dado el valor futuro, gradiente, tasa y periodos.',
      formula: 'A = (VF - G × (F/G)) / (F/A)',
      onSubmit: onSubmitADesdeVFAritmetico,
      campos: [
        {
          id: 'VF',
          label: 'Valor futuro (VF):',
          value: VF,
          onChange: setVF,
          unidad: '$',
        },
        {
          id: 'G',
          label: 'Gradiente aritmético (G):',
          value: G,
          onChange: setG,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      esMonetario: true,
    },
    'G-desde-vf-aritmetico': {
      titulo: 'Gradiente (G) desde VF - Gradiente Aritmético',
      descripcion:
        'Calcula el gradiente aritmético dado el valor futuro, primera cuota, tasa y periodos.',
      formula: 'G = (VF - A × (F/A)) / (F/G)',
      onSubmit: onSubmitGDesdeVFAritmetico,
      campos: [
        {
          id: 'VF',
          label: 'Valor futuro (VF):',
          value: VF,
          onChange: setVF,
          unidad: '$',
        },
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El gradiente aritmético (G) calculado es:',
      esMonetario: true,
    },
    'vp-geometrico': {
      titulo: 'Valor Presente - Gradiente Geométrico',
      descripcion:
        'Calcula el valor presente de una serie con incrementos porcentuales constantes.',
      formula: 'VP = A × [1 - ((1+g)/(1+i))^n] / (i - g)',
      onSubmit: onSubmitVPGeometrico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento:',
          value: g,
          onChange: setg,
          unidad: '%',
          mostrarPeriodoCrecimiento: true,
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor presente calculado es:',
      esMonetario: true,
    },
    'vf-geometrico': {
      titulo: 'Valor Futuro - Gradiente Geométrico',
      descripcion:
        'Calcula el valor futuro de una serie con incrementos porcentuales constantes.',
      formula: 'VF = A × [(1+i)^n - (1+g)^n] / (i - g)',
      onSubmit: onSubmitVFGeometrico,
      campos: [
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento:',
          value: g,
          onChange: setg,
          unidad: '%',
          mostrarPeriodoCrecimiento: true,
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'El valor futuro calculado es:',
      esMonetario: true,
    },
    'A-desde-vp-geometrico': {
      titulo: 'Primera Cuota (A) - Gradiente Geométrico',
      descripcion:
        'Calcula la primera cuota dado el valor presente, tasa de crecimiento, tasa de interés y periodos.',
      formula: 'A = VP × (i - g) / [1 - ((1+g)/(1+i))^n]',
      onSubmit: onSubmitADesdeVPGeometrico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento:',
          value: g,
          onChange: setg,
          unidad: '%',
          mostrarPeriodoCrecimiento: true,
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      esMonetario: true,
    },
    'g-desde-vp-geometrico': {
      titulo: 'Tasa de Crecimiento (g) - Gradiente Geométrico',
      descripcion:
        'Calcula la tasa de crecimiento dado el valor presente, primera cuota, tasa de interés y periodos.',
      formula: 'Método numérico para encontrar g',
      onSubmit: onSubmitGDesdeVPGeometrico,
      campos: [
        {
          id: 'VP',
          label: 'Valor presente (VP):',
          value: VP,
          onChange: setVP,
          unidad: '$',
        },
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La tasa de crecimiento calculada es:',
      esMonetario: false,
      unidadResultado: '%',
    },
    'A-desde-vf-geometrico': {
      titulo: 'Primera Cuota (A) desde VF - Gradiente Geométrico',
      descripcion:
        'Calcula la primera cuota dado el valor futuro, tasa de crecimiento, tasa de interés y periodos.',
      formula: 'A = VF × (i - g) / [(1+i)^n - (1+g)^n]',
      onSubmit: onSubmitADesdeVFGeometrico,
      campos: [
        {
          id: 'VF',
          label: 'Valor futuro (VF):',
          value: VF,
          onChange: setVF,
          unidad: '$',
        },
        {
          id: 'g',
          label: 'Tasa de crecimiento:',
          value: g,
          onChange: setg,
          unidad: '%',
          mostrarPeriodoCrecimiento: true,
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La primera cuota (A) calculada es:',
      esMonetario: true,
    },
    'g-desde-vf-geometrico': {
      titulo: 'Tasa de Crecimiento (g) desde VF - Gradiente Geométrico',
      descripcion:
        'Calcula la tasa de crecimiento dado el valor futuro, primera cuota, tasa de interés y periodos.',
      formula: 'Método numérico para encontrar g',
      onSubmit: onSubmitGDesdeVFGeometrico,
      campos: [
        {
          id: 'VF',
          label: 'Valor futuro (VF):',
          value: VF,
          onChange: setVF,
          unidad: '$',
        },
        {
          id: 'A',
          label: 'Primera cuota (A):',
          value: A,
          onChange: setA,
          unidad: '$',
        },
        {
          id: 'i',
          label: 'Tasa de interés:',
          value: i,
          onChange: setI,
          unidad: '%',
          mostrarPeriodo: true,
        },
        {
          id: 'n',
          label: 'Número de periodos:',
          value: n,
          onChange: setN,
          unidad: 'periodos',
        },
      ],
      textoResultado: 'La tasa de crecimiento calculada es:',
      esMonetario: false,
      unidadResultado: '%',
    },
  }

  // Funciones de cálculo - GRADIENTE ARITMÉTICO (MODIFICADAS)
  function onSubmitVPAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.valorPresenteAritmetico(
      parsearNumero(A),
      parsearNumero(G),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitVFAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.valorFuturoAritmetico(
      parsearNumero(A),
      parsearNumero(G),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitADesdeVPAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularADesdeVPAritmetico(
      parsearNumero(VP),
      parsearNumero(G),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitGDesdeVPAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularGDesdeVPAritmetico(
      parsearNumero(VP),
      parsearNumero(A),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitADesdeVFAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularADesdeVFAritmetico(
      parsearNumero(VF),
      parsearNumero(G),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitGDesdeVFAritmetico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularGDesdeVFAritmetico(
      parsearNumero(VF),
      parsearNumero(A),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  // Funciones de cálculo - GRADIENTE GEOMÉTRICO (MODIFICADAS)
  function onSubmitVPGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
      parsearNumero(g),
      periodoGradiente,
      periodoTasaCrecimiento
    )
    const resultadoCalculo = calcularGradientes.valorPresenteGeometrico(
      parsearNumero(A),
      crecimientoAjustado,
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitVFGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
      parsearNumero(g),
      periodoGradiente,
      periodoTasaCrecimiento
    )
    const resultadoCalculo = calcularGradientes.valorFuturoGeometrico(
      parsearNumero(A),
      crecimientoAjustado,
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitADesdeVPGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
      parsearNumero(g),
      periodoGradiente,
      periodoTasaCrecimiento
    )
    const resultadoCalculo = calcularGradientes.calcularADesdeVPGeometrico(
      parsearNumero(VP),
      crecimientoAjustado,
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitGDesdeVPGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularGDesdeVPGeometrico(
      parsearNumero(VP),
      parsearNumero(A),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }
    const tasaCrecimientoEnPeriodoOrigen =
      (Math.pow(
        1 + resultadoCalculo,
        periodosPorAno[periodoGradiente] /
          periodosPorAno[periodoTasaCrecimiento]
      ) -
        1) *
      100
    setResultado(tasaCrecimientoEnPeriodoOrigen)
  }

  function onSubmitADesdeVFGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const crecimientoAjustado = ajustarTasaCrecimientoSegunPeriodo(
      parsearNumero(g),
      periodoGradiente,
      periodoTasaCrecimiento
    )
    const resultadoCalculo = calcularGradientes.calcularADesdeVFGeometrico(
      parsearNumero(VF),
      crecimientoAjustado,
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    setResultado(resultadoCalculo)
  }

  function onSubmitGDesdeVFGeometrico(e) {
    e.preventDefault()
    const tasaAjustada = ajustarTasaSegunPeriodo(
      parsearNumero(i),
      periodoGradiente,
      periodoTasa
    )
    const resultadoCalculo = calcularGradientes.calcularGDesdeVFGeometrico(
      parsearNumero(VF),
      parsearNumero(A),
      tasaAjustada,
      parsearNumero(n),
      periodoGradiente
    )
    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }
    const tasaCrecimientoEnPeriodoOrigen =
      (Math.pow(
        1 + resultadoCalculo,
        periodosPorAno[periodoGradiente] /
          periodosPorAno[periodoTasaCrecimiento]
      ) -
        1) *
      100
    setResultado(tasaCrecimientoEnPeriodoOrigen)
  }

  function handleSelectChange(e) {
    const value = e.target.value
    setOpcion(value)
    setResultado(null)
    setA('')
    setG('')
    setg('')
    setI('')
    setN('')
    setVP('')
    setVF('')
  }

  function handleTipoGradienteChange(e) {
    const value = e.target.value
    setTipoGradiente(value)
    setResultado(null)
    if (value === 'aritmetico') {
      setOpcion('vp-aritmetico')
    } else {
      setOpcion('vp-geometrico')
    }
    setA('')
    setG('')
    setg('')
    setI('')
    setN('')
    setVP('')
    setVF('')
  }

  const config = opcionesConfig[opcion]

  const opcionesFiltradas = {
    aritmetico: [
      { value: 'vp-aritmetico', label: 'Valor Presente' },
      { value: 'vf-aritmetico', label: 'Valor Futuro' },
      { value: 'A-desde-vp-aritmetico', label: 'A desde VP' },
      { value: 'G-desde-vp-aritmetico', label: 'G desde VP' },
      { value: 'A-desde-vf-aritmetico', label: 'A desde VF' },
      { value: 'G-desde-vf-aritmetico', label: 'G desde VF' },
    ],
    geometrico: [
      { value: 'vp-geometrico', label: 'Valor Presente' },
      { value: 'vf-geometrico', label: 'Valor Futuro' },
      { value: 'A-desde-vp-geometrico', label: 'A desde VP' },
      { value: 'g-desde-vp-geometrico', label: 'g desde VP' },
      { value: 'A-desde-vf-geometrico', label: 'A desde VF' },
      { value: 'g-desde-vf-geometrico', label: 'g desde VF' },
    ],
  }

  return (
    <PageWrapper>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              Calculadora de Gradientes y Series Variables
            </h1>
            <p className='text-gray-600'>
              Herramienta para cálculos de series con incrementos aritméticos y
              geométricos
            </p>
          </div>

          <div className='mb-8 bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label
                  htmlFor='tipo-gradiente'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tipo de Gradiente:
                </label>
                <select
                  id='tipo-gradiente'
                  onChange={handleTipoGradienteChange}
                  value={tipoGradiente}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='aritmetico'>Gradiente Aritmético</option>
                  <option value='geometrico'>Gradiente Geométrico</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='calculo-select'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tipo de Cálculo:
                </label>
                <select
                  id='calculo-select'
                  onChange={handleSelectChange}
                  value={opcion}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  {opcionesFiltradas[tipoGradiente].map((opcionItem) => (
                    <option key={opcionItem.value} value={opcionItem.value}>
                      {opcionItem.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor='periodo-gradiente'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Periodo del Gradiente:
                </label>
                <select
                  id='periodo-gradiente'
                  onChange={(e) => setPeriodoGradiente(e.target.value)}
                  value={periodoGradiente}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50'
                >
                  <option value='mensual'>Mensual</option>
                  <option value='trimestral'>Trimestral</option>
                  <option value='semestral'>Semestral</option>
                  <option value='anual'>Anual</option>
                  <option value='diaria'>Diaria</option>
                </select>
              </div>
            </div>

            {/* NUEVO: Selectores de periodo de tasa */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <div>
                <label
                  htmlFor='periodo-tasa'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  La tasa de interés que voy a ingresar es:
                </label>
                <select
                  id='periodo-tasa'
                  onChange={(e) => setPeriodoTasa(e.target.value)}
                  value={periodoTasa}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50'
                >
                  <option value='diaria'>Diaria</option>
                  <option value='mensual'>Mensual</option>
                  <option value='trimestral'>Trimestral</option>
                  <option value='semestral'>Semestral</option>
                  <option value='anual'>Anual</option>
                </select>
              </div>

              {tipoGradiente === 'geometrico' && (
                <div>
                  <label
                    htmlFor='periodo-tasa-crecimiento'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    La tasa de crecimiento que voy a ingresar es:
                  </label>
                  <select
                    id='periodo-tasa-crecimiento'
                    onChange={(e) => setPeriodoTasaCrecimiento(e.target.value)}
                    value={periodoTasaCrecimiento}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50'
                  >
                    <option value='diaria'>Diaria</option>
                    <option value='mensual'>Mensual</option>
                    <option value='trimestral'>Trimestral</option>
                    <option value='semestral'>Semestral</option>
                    <option value='anual'>Anual</option>
                  </select>
                </div>
              )}
            </div>

            <div className='mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg'>
              <p className='text-indigo-700 text-sm'>
                <strong>Periodo de cálculo:</strong>{' '}
                {periodoGradiente.charAt(0).toUpperCase() +
                  periodoGradiente.slice(1)}
                {i && (
                  <span className='ml-2'>
                    • Tasa ingresada ({periodoTasa}): {parsearNumero(i)}%
                    {periodoTasa !== periodoGradiente && (
                      <span>
                        {' '}
                        → Convertida a {periodoGradiente}:{' '}
                        {(
                          ajustarTasaSegunPeriodo(
                            parsearNumero(i),
                            periodoGradiente,
                            periodoTasa
                          ) * 100
                        ).toFixed(4)}
                        %
                      </span>
                    )}
                  </span>
                )}
                {g && tipoGradiente === 'geometrico' && (
                  <span className='ml-2'>
                    • Crecimiento ingresado ({periodoTasaCrecimiento}):{' '}
                    {parsearNumero(g)}%
                    {periodoTasaCrecimiento !== periodoGradiente && (
                      <span>
                        {' '}
                        → Convertido a {periodoGradiente}:{' '}
                        {(
                          ajustarTasaCrecimientoSegunPeriodo(
                            parsearNumero(g),
                            periodoGradiente,
                            periodoTasaCrecimiento
                          ) * 100
                        ).toFixed(4)}
                        %
                      </span>
                    )}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white'>
              <h2 className='text-2xl font-semibold mb-2'>{config.titulo}</h2>
              <p className='opacity-90'>{config.descripcion}</p>
              <div className='mt-2 bg-purple-500 bg-opacity-20 p-2 rounded'>
                <p className='text-sm'>
                  <strong>Periodo de cálculo:</strong>{' '}
                  {periodoGradiente.charAt(0).toUpperCase() +
                    periodoGradiente.slice(1)}
                </p>
              </div>
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
                        {campo.mostrarPeriodo && (
                          <span className='text-purple-600 ml-1'>
                            ({periodoTasa})
                          </span>
                        )}
                        {campo.mostrarPeriodoCrecimiento && (
                          <span className='text-purple-600 ml-1'>
                            ({periodoTasaCrecimiento})
                          </span>
                        )}
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

              {resultado !== null && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-green-800 font-medium'>
                    {config.textoResultado}
                  </p>
                  <div className='text-2xl font-bold text-green-700 mt-1'>
                    {config.esMonetario
                      ? formatoPesos(resultado)
                      : `${resultado.toFixed(2)}${
                          config.unidadResultado || ''
                        }`}
                  </div>
                  <p className='text-green-600 text-sm mt-2'>
                    Cálculo realizado con periodo {periodoGradiente}
                    {i && periodoTasa !== periodoGradiente && (
                      <span>
                        {' '}
                        • Tasa convertida de {periodoTasa} a {periodoGradiente}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              💡 ¿Cómo usar esta calculadora?
            </h3>
            <div className='text-yellow-700 space-y-2'>
              <p>
                <strong>Gradiente Aritmético:</strong> Serie de pagos que
                aumentan o disminuyen en una cantidad constante cada periodo.
                Ejemplo: $100, $120, $140, $160... (G = $20)
              </p>
              <p>
                <strong>Gradiente Geométrico:</strong> Serie de pagos que
                aumentan o disminuyen en un porcentaje constante cada periodo.
                Ejemplo: $100, $110, $121, $133.10... (g = 10%)
              </p>
              <div className='mt-3 p-3 bg-yellow-100 rounded'>
                <p className='font-semibold text-yellow-900'>
                  Importante sobre las tasas:
                </p>
                <ul className='list-disc list-inside mt-2 space-y-1'>
                  <li>
                    <strong>Periodo del Gradiente:</strong> Define cada cuánto
                    ocurren los pagos
                  </li>
                  <li>
                    <strong>Periodo de la Tasa:</strong> Define en qué periodo
                    está expresada la tasa que vas a ingresar
                  </li>
                  <li>
                    La calculadora convierte automáticamente las tasas al
                    periodo del gradiente
                  </li>
                  <li>
                    Ejemplo: Si tus pagos son mensuales pero tienes tasa anual,
                    selecciona "Mensual" en periodo del gradiente y "Anual" en
                    periodo de la tasa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
