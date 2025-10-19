// -----------------------------------
// Interés (TEA y rendimiento)
// -----------------------------------
export const calcularInteres = {
  calcularTea(interesNominal, numeroPeriodos) {
    // Tasa Efectiva Anual
    return ((1 + interesNominal / numeroPeriodos) ** numeroPeriodos - 1) * 100
  },

  calcularInteresRendimiento(montoFinal, montoInicial, totalPeriodos) {
    // Rendimiento efectivo por periodo
    return ((montoFinal / montoInicial) ** (1 / totalPeriodos) - 1) * 100
  },
}

// -----------------------------------
// Interés Simple
// -----------------------------------
export const calcularInteresSimple = {
  calcularInteresSimple(capitalInicial, tasa, tiempoEnAnios) {
    return capitalInicial * tasa * tiempoEnAnios
  },

  calcularValorFuturo(capitalInicial, tasa, tiempoEnAnios) {
    return capitalInicial * (1 + tasa * tiempoEnAnios)
  },

  calcularCapital(montoFinal, tasa, tiempoEnAnios) {
    return montoFinal / (1 + tasa * tiempoEnAnios)
  },

  calcularTasa(capitalInicial, montoFinal, tiempoEnAnios) {
    return (montoFinal / capitalInicial - 1) / tiempoEnAnios
  },

  calcularTiempo(capitalInicial, montoFinal, tasa) {
    return (montoFinal / capitalInicial - 1) / tasa
  },
}

// -----------------------------------
// Interés Compuesto
// -----------------------------------
export const calcularInteresCompuesto = {
  // Monto Compuesto
  calcularMontoCompuesto(capitalInicial, tasa, periodos) {
    return capitalInicial * Math.pow(1 + tasa, periodos)
  },

  // Tasa de interés
  calcularTasa(capitalInicial, montoFinal, periodos) {
    return Math.pow(montoFinal / capitalInicial, 1 / periodos) - 1
  },

  // Interés Compuesto (ganancia)
  calcularInteresCompuesto(capitalInicial, tasa, periodos) {
    return (
      this.calcularMontoCompuesto(capitalInicial, tasa, periodos) -
      capitalInicial
    )
  },

  // Tiempo (n)
  calcularTiempo(capitalInicial, montoFinal, tasa) {
    return Math.log(montoFinal / capitalInicial) / Math.log(1 + tasa)
  },

  // Capital Inicial
  calcularCapitalInicial(montoFinal, tasa, periodos) {
    return montoFinal / Math.pow(1 + tasa, periodos)
  },
}

// -----------------------------------
// Conversión de periodos a días
// -----------------------------------
export function convertirAPeriodosEnDias(periodos, frecuencia) {
  const equivalencias = {
    diario: 1,
    mensual: 30,
    trimestral: 90,
    cuatrimestral: 120,
    semestral: 180,
    anual: 360,
  }

  return periodos * equivalencias[frecuencia.toLowerCase()]
}

// -----------------------------------
// Anualidades
// -----------------------------------
export const anualidadesUtils = {
  // Valor Futuro (anualidad ordinaria o vencida)
  valorFuturo(A, i, n) {
    return A * ((Math.pow(1 + i, n) - 1) / i)
  },

  // Valor Futuro (anualidad anticipada)
  valorFuturoAnticipada(A, i, n) {
    return this.valorFuturo(A, i, n) * (1 + i)
  },

  // Valor Presente (anualidad ordinaria o vencida)
  valorPresente(A, i, n) {
    return A * ((1 - Math.pow(1 + i, -n)) / i)
  },

  // Valor Presente (anualidad anticipada)
  valorPresenteAnticipada(A, i, n) {
    return this.valorPresente(A, i, n) * (1 + i)
  },

  // Calcular la renta (A) a partir del Valor Futuro
  rentaDesdeVF(VF, i, n) {
    return (VF * i) / (Math.pow(1 + i, n) - 1)
  },

  // Calcular la renta (A) a partir del Valor Presente
  rentaDesdeVP(VA, i, n) {
    return (VA * i) / (1 - Math.pow(1 + i, -n))
  },
}

// // -----------------------------------
// // Gradientes y Series Variables - CORREGIDAS
// // -----------------------------------
// export const calcularGradientes = {
//   // Gradiente Aritmético - Valor Presente
//   valorPresenteAritmetico(A, G, i, n) {
//     const factorP_A = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))
//     const factorP_G =
//       (1 / i) *
//       ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)) -
//         n / Math.pow(1 + i, n))
//     return A * factorP_A + G * factorP_G
//   },

//   // Gradiente Aritmético - Valor Futuro
//   valorFuturoAritmetico(A, G, i, n) {
//     const factorF_A = (Math.pow(1 + i, n) - 1) / i
//     const factorF_G = (1 / i) * ((Math.pow(1 + i, n) - 1) / i - n)
//     return A * factorF_A + G * factorF_G
//   },

//   // Gradiente Aritmético - Serie Uniforme Equivalente
//   serieUniformeAritmetico(A, G, i, n) {
//     const factorA_G = 1 / i - n / (Math.pow(1 + i, n) - 1)
//     return A + G * factorA_G
//   },

//   // Gradiente Geométrico - Valor Presente
//   valorPresenteGeometrico(A, g, i, n) {
//     if (Math.abs(i - g) < 0.0001) {
//       return (A * n) / (1 + i)
//     } else {
//       return (A / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
//     }
//   },

//   // Gradiente Geométrico - Valor Futuro
//   valorFuturoGeometrico(A, g, i, n) {
//     if (Math.abs(i - g) < 0.0001) {
//       return A * n * Math.pow(1 + i, n - 1)
//     } else {
//       return (A / (i - g)) * (Math.pow(1 + i, n) - Math.pow(1 + g, n))
//     }
//   },

//   // Gradiente Geométrico - Serie Uniforme Equivalente
//   serieUniformeGeometrico(A, g, i, n) {
//     const VP = this.valorPresenteGeometrico(A, g, i, n)
//     const factorA_P = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
//     return VP * factorA_P
//   },

//   // Calcular A desde VP - Gradiente Aritmético
//   calcularADesdeVPAritmetico(VP, G, i, n) {
//     const factorP_A = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))
//     const factorP_G =
//       (1 / i) *
//       ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)) -
//         n / Math.pow(1 + i, n))
//     return (VP - G * factorP_G) / factorP_A
//   },

//   // Calcular G desde VP - Gradiente Aritmético
//   calcularGDesdeVPAritmetico(VP, A, i, n) {
//     const factorP_A = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))
//     const factorP_G =
//       (1 / i) *
//       ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)) -
//         n / Math.pow(1 + i, n))
//     return (VP - A * factorP_A) / factorP_G
//   },

//   // Calcular A desde VP - Gradiente Geométrico
//   calcularADesdeVPGeometrico(VP, g, i, n) {
//     if (Math.abs(i - g) < 0.0001) {
//       return (VP * (1 + i)) / n
//     } else {
//       const factor = (1 / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
//       return VP / factor
//     }
//   },

//   // Calcular g desde VP - Gradiente Geométrico (método numérico)
//   calcularGDesdeVPGeometrico(VP, A, i, n) {
//     let low = -0.99
//     let high = 5.0
//     const tolerance = 0.000001
//     const maxIterations = 1000

//     for (let iter = 0; iter < maxIterations; iter++) {
//       const mid = (low + high) / 2
//       const vpCalculado = this.valorPresenteGeometrico(A, mid, i, n)

//       if (Math.abs(vpCalculado - VP) < tolerance) {
//         return mid
//       }

//       if (vpCalculado < VP) {
//         low = mid
//       } else {
//         high = mid
//       }
//     }

//     return (low + high) / 2
//   },
// }

// // -----------------------------------
// // Sistemas de Amortización - CORREGIDOS
// // -----------------------------------
// export const sistemasAmortizacion = {
//   // Sistema Francés (Cuota Constante)
//   sistemaFrances: {
//     calcularCuota(VP, i, n) {
//       return (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
//     },

//     generarTablaAmortizacion(VP, i, n) {
//       const cuota = this.calcularCuota(VP, i, n)
//       const tabla = []
//       let saldo = VP

//       for (let periodo = 1; periodo <= n; periodo++) {
//         const interes = saldo * i
//         const capital = cuota - interes
//         saldo -= capital

//         if (periodo === n) {
//           saldo = 0
//         }

//         tabla.push({
//           periodo,
//           cuota,
//           interes,
//           capital,
//           saldo: Math.max(saldo, 0),
//         })
//       }

//       return tabla
//     },

//     calcularInteresTotal(VP, i, n) {
//       const cuota = this.calcularCuota(VP, i, n)
//       return cuota * n - VP
//     },
//   },

//   // Sistema Alemán (Amortización Constante)
//   sistemaAleman: {
//     calcularAmortizacionConstante(VP, n) {
//       return VP / n
//     },

//     calcularCuotaPeriodo(VP, i, n, periodo) {
//       const amortizacion = this.calcularAmortizacionConstante(VP, n)
//       const saldoInicial = VP - amortizacion * (periodo - 1)
//       const interes = saldoInicial * i
//       return amortizacion + interes
//     },

//     generarTablaAmortizacion(VP, i, n) {
//       const amortizacion = this.calcularAmortizacionConstante(VP, n)
//       const tabla = []
//       let saldo = VP

//       for (let periodo = 1; periodo <= n; periodo++) {
//         const interes = saldo * i
//         const cuota = amortizacion + interes
//         saldo -= amortizacion

//         tabla.push({
//           periodo,
//           cuota,
//           interes,
//           capital: amortizacion,
//           saldo: Math.max(saldo, 0),
//         })
//       }

//       return tabla
//     },

//     calcularInteresTotal(VP, i, n) {
//       const amortizacion = VP / n
//       let interesTotal = 0
//       let saldo = VP

//       for (let periodo = 1; periodo <= n; periodo++) {
//         interesTotal += saldo * i
//         saldo -= amortizacion
//       }

//       return interesTotal
//     },
//   },

//   // Sistema Americano (Solo intereses + pago final)
//   sistemaAmericano: {
//     calcularCuotaIntereses(VP, i) {
//       return VP * i
//     },

//     generarTablaAmortizacion(VP, i, n) {
//       const cuotaIntereses = this.calcularCuotaIntereses(VP, i)
//       const tabla = []
//       let saldo = VP

//       for (let periodo = 1; periodo <= n; periodo++) {
//         const interes = VP * i
//         let capital = 0
//         let cuota = interes

//         if (periodo === n) {
//           capital = VP
//           cuota = interes + capital
//           saldo = 0
//         }

//         tabla.push({
//           periodo,
//           cuota,
//           interes,
//           capital,
//           saldo: periodo === n ? 0 : saldo,
//         })
//       }

//       return tabla
//     },

//     calcularInteresTotal(VP, i, n) {
//       return VP * i * n
//     },
//   },

//   // Cálculos generales
//   calcularTasaDesdeCuota(VP, cuota, n) {
//     let low = 0.000001
//     let high = 1.0
//     const tolerance = 0.000001
//     const maxIterations = 1000

//     for (let iter = 0; iter < maxIterations; iter++) {
//       const mid = (low + high) / 2
//       const cuotaCalculada =
//         (VP * mid * Math.pow(1 + mid, n)) / (Math.pow(1 + mid, n) - 1)

//       if (Math.abs(cuotaCalculada - cuota) < tolerance) {
//         return mid
//       }

//       if (cuotaCalculada > cuota) {
//         high = mid
//       } else {
//         low = mid
//       }
//     }

//     return (low + high) / 2
//   },

//   calcularPeriodosDesdeCuota(VP, cuota, i) {
//     if (cuota <= VP * i) {
//       return Infinity
//     }
//     return Math.log(cuota / (cuota - VP * i)) / Math.log(1 + i)
//   },

//   calcularSaldoInsoluto(VP, i, n, periodo) {
//     const cuota = (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
//     const periodosRestantes = n - periodo
//     return (
//       (cuota * (Math.pow(1 + i, periodosRestantes) - 1)) /
//       (i * Math.pow(1 + i, periodosRestantes))
//     )
//   },
// }

// -----------------------------------
// Gradientes y Series Variables - VERIFICADAS
// -----------------------------------
export const calcularGradientes = {
  // Gradiente Aritmético - Valor Presente
  // Fórmula: VP = A * (P/A, i%, n) + G * (P/G, i%, n)
  valorPresenteAritmetico(A, G, i, n) {
    // Factor (P/A)
    const factor_PA = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))

    // Factor (P/G)
    const factor_PG =
      (Math.pow(1 + i, n) - i * n - 1) / (Math.pow(i, 2) * Math.pow(1 + i, n))

    return A * factor_PA + G * factor_PG
  },

  // Gradiente Aritmético - Valor Futuro
  // Fórmula: VF = A * (F/A, i%, n) + G * (F/G, i%, n)
  valorFuturoAritmetico(A, G, i, n) {
    // Factor (F/A)
    const factor_FA = (Math.pow(1 + i, n) - 1) / i

    // Factor (F/G)
    const factor_FG = (Math.pow(1 + i, n) - 1) / Math.pow(i, 2) - n / i

    return A * factor_FA + G * factor_FG
  },

  // Gradiente Aritmético - Serie Uniforme Equivalente
  // Fórmula: A_eq = A + G * (A/G, i%, n)
  serieUniformeAritmetico(A, G, i, n) {
    // Factor (A/G)
    const factor_AG = 1 / i - n / (Math.pow(1 + i, n) - 1)

    return A + G * factor_AG
  },

  // Gradiente Geométrico - Valor Presente
  // Fórmula: VP = A * [(1 - (1+g)^n * (1+i)^-n) / (i - g)] si i ≠ g
  //          VP = A * n / (1 + i) si i = g
  valorPresenteGeometrico(A, g, i, n) {
    if (Math.abs(i - g) < 0.0001) {
      // Caso especial: i = g
      return (A * n) / (1 + i)
    } else {
      // Caso general: i ≠ g
      return (A / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
    }
  },

  // Gradiente Geométrico - Valor Futuro
  // Fórmula: VF = A * [(1+i)^n - (1+g)^n] / (i - g) si i ≠ g
  //          VF = A * n * (1+i)^(n-1) si i = g
  valorFuturoGeometrico(A, g, i, n) {
    if (Math.abs(i - g) < 0.0001) {
      // Caso especial: i = g
      return A * n * Math.pow(1 + i, n - 1)
    } else {
      // Caso general: i ≠ g
      return (A / (i - g)) * (Math.pow(1 + i, n) - Math.pow(1 + g, n))
    }
  },

  // Gradiente Geométrico - Serie Uniforme Equivalente
  serieUniformeGeometrico(A, g, i, n) {
    const VP = this.valorPresenteGeometrico(A, g, i, n)
    // Convertir VP a anualidad usando (A/P)
    const factor_AP = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    return VP * factor_AP
  },

  // Calcular A desde VP - Gradiente Aritmético
  calcularADesdeVPAritmetico(VP, G, i, n) {
    const factor_PA = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))
    const factor_PG =
      (Math.pow(1 + i, n) - i * n - 1) / (Math.pow(i, 2) * Math.pow(1 + i, n))

    return (VP - G * factor_PG) / factor_PA
  },

  // Calcular G desde VP - Gradiente Aritmético
  calcularGDesdeVPAritmetico(VP, A, i, n) {
    const factor_PA = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))
    const factor_PG =
      (Math.pow(1 + i, n) - i * n - 1) / (Math.pow(i, 2) * Math.pow(1 + i, n))

    return (VP - A * factor_PA) / factor_PG
  },

  // Calcular A desde VP - Gradiente Geométrico
  calcularADesdeVPGeometrico(VP, g, i, n) {
    if (Math.abs(i - g) < 0.0001) {
      return (VP * (1 + i)) / n
    } else {
      const factor = (1 / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
      return VP / factor
    }
  },

  // Calcular g desde VP - Gradiente Geométrico (método numérico)
  calcularGDesdeVPGeometrico(VP, A, i, n) {
    let low = -0.99
    let high = 5.0
    const tolerance = 0.000001
    const maxIterations = 1000

    for (let iter = 0; iter < maxIterations; iter++) {
      const mid = (low + high) / 2
      const vpCalculado = this.valorPresenteGeometrico(A, mid, i, n)

      if (Math.abs(vpCalculado - VP) < tolerance) {
        return mid
      }

      if (vpCalculado < VP) {
        low = mid
      } else {
        high = mid
      }
    }

    return (low + high) / 2
  },
}

// -----------------------------------
// Sistemas de Amortización
// -----------------------------------
export const sistemasAmortizacion = {
  // Sistema Francés (Cuota Constante)
  sistemaFrances: {
    // Fórmula: Cuota = VP * [i(1+i)^n] / [(1+i)^n - 1]
    calcularCuota(VP, i, n) {
      return (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    },

    generarTablaAmortizacion(VP, i, n) {
      const cuota = this.calcularCuota(VP, i, n)
      const tabla = []
      let saldo = VP

      for (let periodo = 1; periodo <= n; periodo++) {
        const interes = saldo * i
        const capital = cuota - interes
        saldo -= capital

        // Ajuste para evitar errores de redondeo en el último periodo
        if (periodo === n && Math.abs(saldo) < 0.01) {
          saldo = 0
        }

        tabla.push({
          periodo,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(capital.toFixed(2)),
          saldo: Number(Math.max(saldo, 0).toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n) {
      const cuota = this.calcularCuota(VP, i, n)
      return cuota * n - VP
    },
  },

  // Sistema Alemán (Amortización Constante)
  sistemaAleman: {
    calcularAmortizacionConstante(VP, n) {
      return VP / n
    },

    calcularCuotaPeriodo(VP, i, n, periodo) {
      const amortizacion = this.calcularAmortizacionConstante(VP, n)
      const saldoInicial = VP - amortizacion * (periodo - 1)
      const interes = saldoInicial * i
      return amortizacion + interes
    },

    generarTablaAmortizacion(VP, i, n) {
      const amortizacion = this.calcularAmortizacionConstante(VP, n)
      const tabla = []
      let saldo = VP

      for (let periodo = 1; periodo <= n; periodo++) {
        const interes = saldo * i
        const cuota = amortizacion + interes
        saldo -= amortizacion

        // Ajuste para evitar errores de redondeo en el último periodo
        if (periodo === n && Math.abs(saldo) < 0.01) {
          saldo = 0
        }

        tabla.push({
          periodo,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(amortizacion.toFixed(2)),
          saldo: Number(Math.max(saldo, 0).toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n) {
      const amortizacion = VP / n
      let interesTotal = 0
      let saldo = VP

      for (let periodo = 1; periodo <= n; periodo++) {
        interesTotal += saldo * i
        saldo -= amortizacion
      }

      return interesTotal
    },
  },

  // Sistema Americano (Solo intereses + pago final)
  sistemaAmericano: {
    calcularCuotaIntereses(VP, i) {
      return VP * i
    },

    generarTablaAmortizacion(VP, i, n) {
      const cuotaIntereses = this.calcularCuotaIntereses(VP, i)
      const tabla = []

      for (let periodo = 1; periodo <= n; periodo++) {
        const interes = VP * i
        let capital = 0
        let cuota = interes
        let saldo = VP

        // En el último periodo se paga el capital completo
        if (periodo === n) {
          capital = VP
          cuota = interes + capital
          saldo = 0
        }

        tabla.push({
          periodo,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(capital.toFixed(2)),
          saldo: Number(saldo.toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n) {
      return VP * i * n
    },
  },

  // Cálculos generales
  calcularTasaDesdeCuota(VP, cuota, n) {
    let low = 0.000001
    let high = 1.0
    const tolerance = 0.000001
    const maxIterations = 1000

    for (let iter = 0; iter < maxIterations; iter++) {
      const mid = (low + high) / 2
      const cuotaCalculada =
        (VP * mid * Math.pow(1 + mid, n)) / (Math.pow(1 + mid, n) - 1)

      if (Math.abs(cuotaCalculada - cuota) < tolerance) {
        return mid
      }

      if (cuotaCalculada > cuota) {
        high = mid
      } else {
        low = mid
      }
    }

    return (low + high) / 2
  },

  calcularPeriodosDesdeCuota(VP, cuota, i) {
    if (cuota <= VP * i) {
      return Infinity
    }
    return Math.log(cuota / (cuota - VP * i)) / Math.log(1 + i)
  },

  calcularSaldoInsoluto(VP, i, n, periodo) {
    const cuota = (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    const periodosRestantes = n - periodo
    return (
      (cuota * (Math.pow(1 + i, periodosRestantes) - 1)) /
      (i * Math.pow(1 + i, periodosRestantes))
    )
  },
}
