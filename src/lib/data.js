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

// // -----------------------------------
// // Interés Simple
// // -----------------------------------
// export const calcularInteresSimple = {
//   calcularInteresSimple(capitalInicial, tasa, tiempoEnAnios) {
//     return capitalInicial * tasa * tiempoEnAnios
//   },

//   calcularValorFuturo(capitalInicial, tasa, tiempoEnAnios) {
//     return capitalInicial * (1 + tasa * tiempoEnAnios)
//   },

//   calcularCapital(montoFinal, tasa, tiempoEnAnios) {
//     return montoFinal / (1 + tasa * tiempoEnAnios)
//   },

//   calcularTasa(capitalInicial, montoFinal, tiempoEnAnios) {
//     return (montoFinal / capitalInicial - 1) / tiempoEnAnios
//   },

//   calcularTiempo(capitalInicial, montoFinal, tasa) {
//     return (montoFinal / capitalInicial - 1) / tasa
//   },
// }

// -----------------------------------
// Interés Simple
// -----------------------------------
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

  // NUEVA FUNCIÓN: Calcular retiro parcial
  calcularRetiroParcial(capitalInicial, tasa, tiempoEnAnios, fraccionRetiro) {
    // Calcular el monto total acumulado
    const montoTotal = this.calcularValorFuturo(
      capitalInicial,
      tasa,
      tiempoEnAnios
    )
    // Calcular el monto a retirar
    const montoRetirado = montoTotal * fraccionRetiro

    return {
      montoTotal: montoTotal,
      montoRetirado: montoRetirado,
      montoRestante: montoTotal - montoRetirado,
      interesGenerado: this.calcularInteresSimple(
        capitalInicial,
        tasa,
        tiempoEnAnios
      ),
    }
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

// -----------------------------------
// Utilidades para conversión de periodos
// -----------------------------------
export const conversionesTasa = {
  // Convertir tasa nominal a efectiva según el periodo
  convertirTasa(tasa, periodoOrigen, periodoDestino) {
    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }

    if (periodoOrigen === periodoDestino) {
      return tasa
    }

    // Convertir a tasa efectiva anual primero
    const tasaEfectivaAnual =
      Math.pow(1 + tasa, periodosPorAno[periodoOrigen]) - 1

    // Convertir de anual al periodo destino
    const tasaDestino =
      Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAno[periodoDestino]) - 1

    return tasaDestino
  },

  // Convertir número de periodos según la frecuencia
  convertirPeriodos(n, periodoOrigen, periodoDestino) {
    const equivalencias = {
      diaria: {
        mensual: 30,
        trimestral: 90,
        semestral: 180,
        anual: 365,
      },
      mensual: {
        diaria: 1 / 30,
        trimestral: 3,
        semestral: 6,
        anual: 12,
      },
      trimestral: {
        diaria: 1 / 90,
        mensual: 1 / 3,
        semestral: 2,
        anual: 4,
      },
      semestral: {
        diaria: 1 / 180,
        mensual: 1 / 6,
        trimestral: 1 / 2,
        anual: 2,
      },
      anual: {
        diaria: 1 / 365,
        mensual: 1 / 12,
        trimestral: 1 / 4,
        semestral: 1 / 2,
      },
    }

    if (periodoOrigen === periodoDestino) {
      return n
    }

    return n * equivalencias[periodoOrigen][periodoDestino]
  },
}

/// -----------------------------------
// Utilidades para conversión de periodos
// -----------------------------------
export const conversionesTasa1 = {
  // Convertir tasa nominal a efectiva según el periodo
  convertirTasa(tasa, periodoOrigen, periodoDestino) {
    const periodosPorAno = {
      diaria: 365,
      mensual: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1,
    }

    if (periodoOrigen === periodoDestino) {
      return tasa
    }

    // Convertir a tasa efectiva anual primero
    const tasaEfectivaAnual =
      Math.pow(1 + tasa, periodosPorAno[periodoOrigen]) - 1

    // Convertir de anual al periodo destino
    const tasaDestino =
      Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAno[periodoDestino]) - 1

    return tasaDestino
  },

  // Convertir número de periodos según la frecuencia
  convertirPeriodos(n, periodoOrigen, periodoDestino) {
    const equivalencias = {
      diaria: {
        mensual: 30,
        trimestral: 90,
        semestral: 180,
        anual: 365,
      },
      mensual: {
        diaria: 1 / 30,
        trimestral: 3,
        semestral: 6,
        anual: 12,
      },
      trimestral: {
        diaria: 1 / 90,
        mensual: 1 / 3,
        semestral: 2,
        anual: 4,
      },
      semestral: {
        diaria: 1 / 180,
        mensual: 1 / 6,
        trimestral: 1 / 2,
        anual: 2,
      },
      anual: {
        diaria: 1 / 365,
        mensual: 1 / 12,
        trimestral: 1 / 4,
        semestral: 1 / 2,
      },
    }

    if (periodoOrigen === periodoDestino) {
      return n
    }

    return n * equivalencias[periodoOrigen][periodoDestino]
  },

  // Convertir tasa anual a la periodicidad seleccionada
  convertirTasaAnual(tasaAnual, periodo) {
    const tasaDecimal = tasaAnual / 100

    if (periodo === 'anual') {
      return tasaDecimal
    }

    const conversiones = {
      mensual: tasaDecimal / 12,
      trimestral: tasaDecimal / 4,
      semestral: tasaDecimal / 2,
      diaria: tasaDecimal / 365,
    }

    return conversiones[periodo] || tasaDecimal
  },

  // Convertir tasa de crecimiento anual a la periodicidad seleccionada
  convertirTasaCrecimientoAnual(tasaCrecimientoAnual, periodo) {
    const tasaDecimal = tasaCrecimientoAnual / 100

    if (periodo === 'anual') {
      return tasaDecimal
    }

    const conversiones = {
      mensual: Math.pow(1 + tasaDecimal, 1 / 12) - 1,
      trimestral: Math.pow(1 + tasaDecimal, 1 / 4) - 1,
      semestral: Math.pow(1 + tasaDecimal, 1 / 2) - 1,
      diaria: Math.pow(1 + tasaDecimal, 1 / 365) - 1,
    }

    return conversiones[periodo] || tasaDecimal
  },
}

// -----------------------------------
// Gradientes y Series Variables - CORREGIDO
// -----------------------------------
export const calcularGradientes = {
  // Gradiente Aritmético - Valor Presente
  valorPresenteAritmetico(A, G, i, n, periodo = 'anual') {
    // Factor P/A para la anualidad base
    const factor_PA = (1 - Math.pow(1 + i, -n)) / i

    // Factor P/G para el gradiente
    const factor_PG =
      ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n)) / i

    return A * factor_PA + G * factor_PG
  },

  // Gradiente Aritmético - Valor Futuro
  valorFuturoAritmetico(A, G, i, n, periodo = 'anual') {
    // Factor F/A para la anualidad base
    const factor_FA = (Math.pow(1 + i, n) - 1) / i

    // Factor F/G para el gradiente
    const factor_FG = ((Math.pow(1 + i, n) - 1) / i - n) / i

    return A * factor_FA + G * factor_FG
  },

  // Gradiente Aritmético - Serie Uniforme Equivalente
  serieUniformeAritmetico(A, G, i, n, periodo = 'anual') {
    const factor_AG = 1 / i - n / (Math.pow(1 + i, n) - 1)
    return A + G * factor_AG
  },

  // Gradiente Geométrico - Valor Presente
  valorPresenteGeometrico(A, g, i, n, periodo = 'anual') {
    if (Math.abs(i - g) < 0.0001) {
      return (A * n) / (1 + i)
    } else {
      return (A / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
    }
  },

  // Gradiente Geométrico - Valor Futuro
  valorFuturoGeometrico(A, g, i, n, periodo = 'anual') {
    if (Math.abs(i - g) < 0.0001) {
      return A * n * Math.pow(1 + i, n - 1)
    } else {
      return (A / (i - g)) * (Math.pow(1 + i, n) - Math.pow(1 + g, n))
    }
  },

  // Gradiente Geométrico - Serie Uniforme Equivalente
  serieUniformeGeometrico(A, g, i, n, periodo = 'anual') {
    const VP = this.valorPresenteGeometrico(A, g, i, n)
    const factor_AP = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    return VP * factor_AP
  },

  // Calcular A desde VP - Gradiente Aritmético
  calcularADesdeVPAritmetico(VP, G, i, n, periodo = 'anual') {
    const factor_PA = (1 - Math.pow(1 + i, -n)) / i
    const factor_PG =
      ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n)) / i

    return (VP - G * factor_PG) / factor_PA
  },

  // Calcular G desde VP - Gradiente Aritmético
  calcularGDesdeVPAritmetico(VP, A, i, n, periodo = 'anual') {
    const factor_PA = (1 - Math.pow(1 + i, -n)) / i
    const factor_PG =
      ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n)) / i

    return (VP - A * factor_PA) / factor_PG
  },

  // Calcular A desde VP - Gradiente Geométrico
  calcularADesdeVPGeometrico(VP, g, i, n, periodo = 'anual') {
    if (Math.abs(i - g) < 0.0001) {
      return (VP * (1 + i)) / n
    } else {
      const factor = (1 / (i - g)) * (1 - Math.pow((1 + g) / (1 + i), n))
      return VP / factor
    }
  },

  // Calcular g desde VP - Gradiente Geométrico (método numérico)
  calcularGDesdeVPGeometrico(VP, A, i, n, periodo = 'anual') {
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

  // Calcular A desde VF - Gradiente Aritmético
  calcularADesdeVFAritmetico(VF, G, i, n, periodo = 'anual') {
    // Primero calcular VP desde VF
    const VP = VF / Math.pow(1 + i, n)
    // Luego calcular A desde VP
    return this.calcularADesdeVPAritmetico(VP, G, i, n, periodo)
  },

  // Calcular G desde VF - Gradiente Aritmético
  calcularGDesdeVFAritmetico(VF, A, i, n, periodo = 'anual') {
    // Primero calcular VP desde VF
    const VP = VF / Math.pow(1 + i, n)
    // Luego calcular G desde VP
    return this.calcularGDesdeVPAritmetico(VP, A, i, n, periodo)
  },

  // Calcular A desde VF - Gradiente Geométrico
  calcularADesdeVFGeometrico(VF, g, i, n, periodo = 'anual') {
    // Primero calcular VP desde VF
    const VP = VF / Math.pow(1 + i, n)
    // Luego calcular A desde VP
    return this.calcularADesdeVPGeometrico(VP, g, i, n, periodo)
  },

  // Calcular g desde VF - Gradiente Geométrico
  calcularGDesdeVFGeometrico(VF, A, i, n, periodo = 'anual') {
    // Primero calcular VP desde VF
    const VP = VF / Math.pow(1 + i, n)
    // Luego calcular g desde VP
    return this.calcularGDesdeVPGeometrico(VP, A, i, n, periodo)
  },
}

// -----------------------------------
// Sistemas de Amortización
// -----------------------------------
export const sistemasAmortizacion = {
  // Sistema Francés (Cuota Constante)
  sistemaFrances: {
    calcularCuota(VP, i, n, periodo = 'anual') {
      return (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    },

    generarTablaAmortizacion(VP, i, n, periodo = 'anual') {
      const cuota = this.calcularCuota(VP, i, n, periodo)
      const tabla = []
      let saldo = VP

      for (let periodoNum = 1; periodoNum <= n; periodoNum++) {
        const interes = saldo * i
        const capital = cuota - interes
        saldo -= capital

        if (periodoNum === n && Math.abs(saldo) < 0.01) {
          saldo = 0
        }

        tabla.push({
          periodo: periodoNum,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(capital.toFixed(2)),
          saldo: Number(Math.max(saldo, 0).toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n, periodo = 'anual') {
      const cuota = this.calcularCuota(VP, i, n, periodo)
      return cuota * n - VP
    },
  },

  // Sistema Alemán (Amortización Constante)
  sistemaAleman: {
    calcularAmortizacionConstante(VP, n, periodo = 'anual') {
      return VP / n
    },

    calcularCuotaPeriodo(VP, i, n, periodoNum, periodo = 'anual') {
      const amortizacion = this.calcularAmortizacionConstante(VP, n, periodo)
      const saldoInicial = VP - amortizacion * (periodoNum - 1)
      const interes = saldoInicial * i
      return amortizacion + interes
    },

    generarTablaAmortizacion(VP, i, n, periodo = 'anual') {
      const amortizacion = this.calcularAmortizacionConstante(VP, n, periodo)
      const tabla = []
      let saldo = VP

      for (let periodoNum = 1; periodoNum <= n; periodoNum++) {
        const interes = saldo * i
        const cuota = amortizacion + interes
        saldo -= amortizacion

        if (periodoNum === n && Math.abs(saldo) < 0.01) {
          saldo = 0
        }

        tabla.push({
          periodo: periodoNum,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(amortizacion.toFixed(2)),
          saldo: Number(Math.max(saldo, 0).toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n, periodo = 'anual') {
      const amortizacion = VP / n
      let interesTotal = 0
      let saldo = VP

      for (let periodoNum = 1; periodoNum <= n; periodoNum++) {
        interesTotal += saldo * i
        saldo -= amortizacion
      }

      return interesTotal
    },
  },

  // Sistema Americano (Solo intereses + pago final)
  sistemaAmericano: {
    calcularCuotaIntereses(VP, i, periodo = 'anual') {
      return VP * i
    },

    generarTablaAmortizacion(VP, i, n, periodo = 'anual') {
      const cuotaIntereses = this.calcularCuotaIntereses(VP, i, periodo)
      const tabla = []

      for (let periodoNum = 1; periodoNum <= n; periodoNum++) {
        const interes = VP * i
        let capital = 0
        let cuota = interes
        let saldo = VP

        if (periodoNum === n) {
          capital = VP
          cuota = interes + capital
          saldo = 0
        }

        tabla.push({
          periodo: periodoNum,
          cuota: Number(cuota.toFixed(2)),
          interes: Number(interes.toFixed(2)),
          capital: Number(capital.toFixed(2)),
          saldo: Number(saldo.toFixed(2)),
        })
      }

      return tabla
    },

    calcularInteresTotal(VP, i, n, periodo = 'anual') {
      return VP * i * n
    },
  },

  // Cálculos generales
  calcularTasaDesdeCuota(VP, cuota, n, periodo = 'anual') {
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

  calcularPeriodosDesdeCuota(VP, cuota, i, periodo = 'anual') {
    if (cuota <= VP * i) {
      return Infinity
    }
    return Math.log(cuota / (cuota - VP * i)) / Math.log(1 + i)
  },

  calcularSaldoInsoluto(VP, i, n, periodoNum, periodo = 'anual') {
    const cuota = (VP * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    const periodosRestantes = n - periodoNum
    return (
      (cuota * (Math.pow(1 + i, periodosRestantes) - 1)) /
      (i * Math.pow(1 + i, periodosRestantes))
    )
  },
}
