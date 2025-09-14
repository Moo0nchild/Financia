// Este archivo sirve para organizar las operaciones matematicas en un solo lugar, y no tenerlas
// dentro de los mismos componentes

export const calcularInteres = {
  calcularTea(interesNominal, numeroPeriodos) {
    // Para calcular el interes tuve que recurrir a buscar en deepseek xd
    // la formula que voy a usar es la de la tasa efectiva anual (TEA)
    // que nos dice cual es el porcentaje de crecimiento real de nuestro dinero en un periodo
    // de un año, teniendo en cuenta la capitalizacion
    // TEA = (1 + (r/n))^n - 1
    // TEA = tasa efectiva anual (expresada en decimal)
    // r = tasa de interes nominal anual (la que anuncia el banco, también en decimal)
    // n = numero de periodos (mensual=12, trimestral=4, diario=365)

    const TEA = (1 + interesNominal / numeroPeriodos) ** numeroPeriodos - 1

    return TEA * 100 // Supongo que esto es decimal
  },

  calcularInteresRendimiento(montoFinal, montoInicial, totalPeriodos) {
    const tasaPeriodica = (montoFinal / montoInicial) ** (1 / totalPeriodos) - 1
    return tasaPeriodica * 100
  },
}

// -----------------------------------

export function calcularInteresSimple() {}

// -----------------------------------

export const calcularInteresCompuesto = {
  // Calcular el Monto Compuesto
  calcularMontoCompuesto(capitalInicial, tasa, periodos) {
    return capitalInicial * (1 + tasa)**periodos;
  },
  
  calcularTasa(capitalInicial, montoFinal, periodos) {
    return (montoFinal / capitalInicial)**(1/periodos) -1; 
  },
  
  calcularTiempo(capitalInicial, montoFinal, tasa) {
    return Math.log(montoFinal / capitalInicial) / Math.log(1 + tasa)
  },

  calcularInteresCompuesto(capitalInicial, tasa, periodos) {
    return (
      this.calcularMontoCompuesto(capitalInicial, tasa, periodos) - capitalInicial
    )
  },

  calcularCapitalInicial(montoFinal, tasa, periodos) {
    return montoFinal / Math.pow(1 + tasa, periodos)
  },
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

