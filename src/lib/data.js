export const calcularInteres = {
  calcularTea(interesNominal, numeroPeriodos) {
    return ((1 + interesNominal / numeroPeriodos) ** numeroPeriodos - 1) * 100 // Supongo que esto es decimal
  },

  calcularInteresRendimiento(montoFinal, montoInicial, totalPeriodos) {
    return ((montoFinal / montoInicial) ** (1 / totalPeriodos) - 1) * 100
  },
}

// -----------------------------------

export const calcularInteresSimple = {
  calcularInteresSimple(capitalInicial, tasa, periodos) {
    return capitalInicial * tasa * periodos // no se si es decimal
  },

  calcularValorFuturo(capitalInicial, tasa, periodos) {
    return capitalInicial * (1 + tasa * periodos)
  },
}

// -----------------------------------

export const calcularInteresCompuesto = {
  // Calcular el Monto Compuesto
  calcularMontoCompuesto(capitalInicial, tasaDiaria, totalDias) {
    return capitalInicial * Math.pow(1 + tasaDiaria, totalDias)
  },

  calcularInteresCompuesto(capitalInicial, tasa, periodos) {
    return (
      this.calcularMontoCompuesto(capitalInicial, tasa, periodos) -
      capitalInicial
    )
  },

  // Calcular el Tiempo (número de periodos)
  calcularTiempo(capitalInicial, montoFinal, tasa) {
    return Math.log(montoFinal / capitalInicial) / Math.log(1 + tasa)
  },

  // Calcular la Tasa de Interés
  calcularTasa(capitalInicial, montoFinal, periodos) {
    return Math.pow(montoFinal / capitalInicial, 1 / periodos) - 1
  },

  // Calcular el Capital Inicial
  calcularCapitalInicial(montoFinal, tasa, periodos) {
    return montoFinal / Math.pow(1 + tasa, periodos)
  },
}

function convertirAPeriodosEnDias(periodos, frecuencia) {
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

// ../lib/anualidades.js
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
