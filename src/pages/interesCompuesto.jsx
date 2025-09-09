import { useState } from "react";
import {calcularInteresCompuesto} from "../lib/data";

export function InteresCompuesto() {
  const [opcion, setOpcion] = useState("monto"); // valor por defecto
  const [capital, setCapital] = useState("");
  const [tasa, setTasa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [montoFinal, setMontoFinal] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    let res = null;

    const C = parseFloat(capital);
    const i = parseFloat(tasa) / 100; // convertir % a decimal
    const n = parseInt(periodos);
    const MC = parseFloat(montoFinal);

    switch (opcion) {
      case "monto":
        res = calcularInteresCompuesto.calcularMontoCompuesto(C, i, n);
        setResultado(`Monto Compuesto: $${res.toFixed(2)}`);
        break;

      case "interes":
        res = calcularInteresCompuesto.calcularInteresCompuesto(C, i, n);
        setResultado(`Interés Compuesto: $${res.toFixed(2)}`);
        break;

      case "capital":
        res = calcularInteresCompuesto.calcularCapitalInicial(MC, i, n);
        setResultado(`Capital Inicial: $${res.toFixed(2)}`);
        break;

      case "tasa":
        res = calcularInteresCompuesto.calcularTasa(C, MC, n);
        setResultado(`Tasa de Interés: ${(res * 100).toFixed(2)}%`);
        break;

      case "tiempo":
        res = calcularInteresCompuesto.calcularTiempo(C, MC, i);
        setResultado(`Tiempo: ${res.toFixed(2)} periodos`);
        break;

      default:
        setResultado("Selecciona una opción válida");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Calculadora de Interés Compuesto
        </h2>

        {/* Selector de opción */}
        <div className="mb-4">
          <label className="block text-gray-700">¿Qué deseas calcular?</label>
          <select
            value={opcion}
            onChange={(e) => setOpcion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mt-1"
          >
            <option value="monto">Monto Compuesto</option>
            <option value="interes">Interés Compuesto</option>
            <option value="capital">Capital Inicial</option>
            <option value="tasa">Tasa de Interés</option>
            <option value="tiempo">Tiempo (n)</option>
          </select>
        </div>

        {/* Inputs dinámicos */}
        {(opcion === "monto" || opcion === "interes") && (
          <>
            <Input label="Capital Inicial ($)" value={capital} onChange={setCapital} />
            <Input label="Tasa de Interés (%)" value={tasa} onChange={setTasa} />
            <Input label="Número de Periodos" value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === "capital" && (
          <>
            <Input label="Monto Final ($)" value={montoFinal} onChange={setMontoFinal} />
            <Input label="Tasa de Interés (%)" value={tasa} onChange={setTasa} />
            <Input label="Número de Periodos" value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === "tasa" && (
          <>
            <Input label="Capital Inicial ($)" value={capital} onChange={setCapital} />
            <Input label="Monto Final ($)" value={montoFinal} onChange={setMontoFinal} />
            <Input label="Número de Periodos" value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === "tiempo" && (
          <>
            <Input label="Capital Inicial ($)" value={capital} onChange={setCapital} />
            <Input label="Monto Final ($)" value={montoFinal} onChange={setMontoFinal} />
            <Input label="Tasa de Interés (%)" value={tasa} onChange={setTasa} />
          </>
        )}

        <button
          onClick={calcular}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Calcular
        </button>

        {resultado && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-800">{resultado}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de input reutilizable
function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type="number"
        className="w-full px-3 py-2 border rounded-lg mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
