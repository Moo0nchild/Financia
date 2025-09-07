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

// -----------------------------------

export function calcularInteresSimple() {}

// -----------------------------------

export function calcularInteresCompuesto() {}

// -----------------------------------

export function calcularAnualidad() {}

// -----------------------------------
