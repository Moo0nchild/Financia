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
  calcularInteresSimple(capitalInicial, tasa, periodos) {
    // I = C * i * n
    return capitalInicial * tasa * periodos
  },

  calcularValorFuturo(capitalInicial, tasa, periodos) {
    // VF = C * (1 + i*n)
    return capitalInicial * (1 + tasa * periodos)
  },

  calcularCapital(montoFinal, tasa, periodos) {
    // C = VF / (1 + i*n)
    return montoFinal / (1 + tasa * periodos)
  },

  calcularTasa(capitalInicial, montoFinal, periodos) {
    // i = (M - C) / (C * n)
    return (montoFinal / capitalInicial - 1) / periodos
  },

  calcularTiempo(capitalInicial, montoFinal, tasa) {
    // n = (M / C - 1) / i
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
