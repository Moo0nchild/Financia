// Este archivo sirve para organizar las operaciones matematicas en un solo lugar, y no tenerlas
// dentro de los mismos componentes

export function calcularInteres(interesNominal, numeroPeriodos) {
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
}

export function calcularInteresRendimiento(
  montoFinal,
  montoInicial,
  totalPeriodos
) {
  const tasaPeriodica = (montoFinal / montoInicial) ** (1 / totalPeriodos) - 1
  return tasaPeriodica * 100
}

// -----------------------------------

export function calcularInteresSimple() {}

// -----------------------------------

export const calcularInteresCompuesto =  {
  // Calcular el Monto Compuesto
   calcularMontoCompuesto(capitalInicial, tasa, periodos) {
    return capitalInicial * Math.pow(1 + tasa, periodos);
  },
 
  // Calcular el Interés Compuesto
   calcularInteresCompuesto(capitalInicial, tasa, periodos) {
    return this.calcularMontoCompuesto(capitalInicial, tasa, periodos) - capitalInicial;
  },

  // Calcular el Tiempo (número de periodos)
   calcularTiempo(capitalInicial, montoFinal, tasa) {
    return Math.log(montoFinal / capitalInicial) / Math.log(1 + tasa);
  },

  // Calcular la Tasa de Interés
   calcularTasa(capitalInicial, montoFinal, periodos) {
    return Math.pow(montoFinal / capitalInicial, 1 / periodos) - 1;
  },

  // Calcular el Capital Inicial
   calcularCapitalInicial(montoFinal, tasa, periodos) {
    return montoFinal / Math.pow(1 + tasa, periodos);
  },
}

// -----------------------------------

export function calcularAnualidad() {}

// -----------------------------------
