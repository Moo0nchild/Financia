import { useState } from "react";
import { anualidadesUtils } from "../lib/data";


// 📌 Componente principal
export  function Anualidades() {
  const [opcion, setOpcion] = useState("vf"); // qué calcular
  const [pago, setPago] = useState("");
  const [tasa, setTasa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [valorFinal, setValorFinal] = useState("");
  const [valorPresente, setValorPresente] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const A = parseFloat(pago);
    const i = parseFloat(tasa) / 100; // convertir % a decimal
    const n = parseInt(periodos);
    const VF = parseFloat(valorFinal);
    const VA = parseFloat(valorPresente);

    let res = null;

    switch (opcion) {
      case "vf":
        res = anualidadesUtils.valorFuturo(A, i, n);
        setResultado(`Valor Futuro (ordinaria): $${res.toFixed(2)}`);
        break;
      case "vfAnt":
        res = anualidadesUtils.valorFuturoAnticipada(A, i, n);
        setResultado(`Valor Futuro (anticipada): $${res.toFixed(2)}`);
        break;
      case "vp":
        res = anualidadesUtils.valorPresente(A, i, n);
        setResultado(`Valor Presente (ordinaria): $${res.toFixed(2)}`);
        break;
      case "vpAnt":
        res = anualidadesUtils.valorPresenteAnticipada(A, i, n);
        setResultado(`Valor Presente (anticipada): $${res.toFixed(2)}`);
        break;
      case "rentaVF":
        res = anualidadesUtils.rentaDesdeVF(VF, i, n);
        setResultado(`Renta (desde VF): $${res.toFixed(2)}`);
        break;
      case "rentaVP":
        res = anualidadesUtils.rentaDesdeVP(VA, i, n);
        setResultado(`Renta (desde VP): $${res.toFixed(2)}`);
        break;
      default:
        setResultado("Selecciona una opción válida");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Calculadora de Anualidades
        </h2>

        {/* Selector */}
        <div className="mb-4">
          <label className="block text-gray-700">¿Qué deseas calcular?</label>
          <select
            value={opcion}
            onChange={(e) => setOpcion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mt-1"
          >
            <option value="vf">Valor Futuro (ordinaria)</option>
            <option value="vfAnt">Valor Futuro (anticipada)</option>
            <option value="vp">Valor Presente (ordinaria)</option>
            <option value="vpAnt">Valor Presente (anticipada)</option>
            <option value="rentaVF">Renta desde Valor Futuro</option>
            <option value="rentaVP">Renta desde Valor Presente</option>
          </select>
        </div>

        {/* Inputs dinámicos */}
        {(opcion === "vf" || opcion === "vfAnt" || opcion === "vp" || opcion === "vpAnt") && (
          <>
            <Input label="Pago periódico (A)" value={pago} onChange={setPago} />
            <Input label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
            <Input label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === "rentaVF" && (
          <>
            <Input label="Valor Futuro (VF)" value={valorFinal} onChange={setValorFinal} />
            <Input label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
            <Input label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
          </>
        )}

        {opcion === "rentaVP" && (
          <>
            <Input label="Valor Presente (VP)" value={valorPresente} onChange={setValorPresente} />
            <Input label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
            <Input label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
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

// Input reutilizable
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