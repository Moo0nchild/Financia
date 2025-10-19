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




// -----------------------------------
// Gradientes y Series Variables
// -----------------------------------
export const calcularGradientes = {
  // Gradiente Aritmético - Valor Presente
  valorPresenteAritmetico(A, G, i, n) {
    return (
      A * ((1 - Math.pow(1 + i, -n)) / i) +
      (G * ((1 - Math.pow(1 + i, -n)) / (i * i)) -
        (n * Math.pow(1 + i, -n)) / i)
    )
  },

  // Gradiente Aritmético - Valor Futuro
  valorFuturoAritmetico(A, G, i, n) {
    const VP = this.valorPresenteAritmetico(A, G, i, n)
    return VP * Math.pow(1 + i, n)
  },

  // Gradiente Aritmético - Serie Uniforme Equivalente
  serieUniformeAritmetico(A, G, i, n) {
    const VP = this.valorPresenteAritmetico(A, G, i, n)
    return (VP * i) / (1 - Math.pow(1 + i, -n))
  },

  // Gradiente Geométrico - Valor Presente
  valorPresenteGeometrico(A, g, i, n) {
    if (i === g) {
      return (A * n) / (1 + i)
    } else {
      return A * ((1 - Math.pow((1 + g) / (1 + i), n)) / (i - g))
    }
  },

  // Gradiente Geométrico - Valor Futuro
  valorFuturoGeometrico(A, g, i, n) {
    const VP = this.valorPresenteGeometrico(A, g, i, n)
    return VP * Math.pow(1 + i, n)
  },

  // Gradiente Geométrico - Serie Uniforme Equivalente
  serieUniformeGeometrico(A, g, i, n) {
    const VP = this.valorPresenteGeometrico(A, g, i, n)
    return (VP * i) / (1 - Math.pow(1 + i, -n))
  },

  // Calcular A (primera cuota) desde Valor Presente - Gradiente Aritmético
  calcularADesdeVPAritmetico(VP, G, i, n) {
    const factorG =
      G * ((1 - Math.pow(1 + i, -n)) / (i * i)) - (n * Math.pow(1 + i, -n)) / i
    return (VP - factorG) * (i / (1 - Math.pow(1 + i, -n)))
  },

  // Calcular G (gradiente) desde Valor Presente - Gradiente Aritmético
  calcularGDesdeVPAritmetico(VP, A, i, n) {
    const factorA = A * ((1 - Math.pow(1 + i, -n)) / i)
    const factorG =
      (1 - Math.pow(1 + i, -n)) / (i * i) - (n * Math.pow(1 + i, -n)) / i
    return (VP - factorA) / factorG
  },

  // Calcular A (primera cuota) desde Valor Presente - Gradiente Geométrico
  calcularADesdeVPGeometrico(VP, g, i, n) {
    if (i === g) {
      return (VP * (1 + i)) / n
    } else {
      return VP * ((i - g) / (1 - Math.pow((1 + g) / (1 + i), n)))
    }
  },

  // Calcular g (tasa de crecimiento) desde Valor Presente - Gradiente Geométrico
  calcularGDesdeVPGeometrico(VP, A, i, n) {
    // Esta función requiere métodos numéricos para resolver
    // Implementación simplificada usando bisección
    let low = -0.99
    let high = 10.0
    const tolerance = 0.0001
    const maxIterations = 1000

    for (let iter = 0; iter < maxIterations; iter++) {
      const mid = (low + high) / 2
      const vpCalculado = this.valorPresenteGeometrico(A, mid, i, n)

      if (Math.abs(vpCalculado - VP) < tolerance) {
        return mid
      }

      if (vpCalculado > VP) {
        high = mid
      } else {
        low = mid
      }
    }

    return (low + high) / 2
  },
}
