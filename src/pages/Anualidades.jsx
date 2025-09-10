import { useState } from "react";
import { anualidadesUtils } from "../lib/data";
import '../styles/Anualidades.css'

export function Anualidades() {
  const [opcion, setOpcion] = useState("vf"); 
  const [pago, setPago] = useState("");
  const [tasa, setTasa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [valorFinal, setValorFinal] = useState("");
  const [valorPresente, setValorPresente] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const A = parseFloat(pago);
    const i = parseFloat(tasa) / 100; 
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
    <div className="anualidad-main-container">
      <header className="anualidad-header">
        <h1>Calculadora de Anualidades</h1>
      </header>

      <div className="anualidad-container">
        <div className="mode-selector">
          <label>¿Qué deseas calcular?</label>
          <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
            <option value="vf">Valor Futuro (ordinaria)</option>
            <option value="vfAnt">Valor Futuro (anticipada)</option>
            <option value="vp">Valor Presente (ordinaria)</option>
            <option value="vpAnt">Valor Presente (anticipada)</option>
            <option value="rentaVF">Renta desde Valor Futuro</option>
            <option value="rentaVP">Renta desde Valor Presente</option>
          </select>
        </div>

        {/* Inputs dinámicos */}
        <form className="anualidad-form">
          {(opcion === "vf" || opcion === "vfAnt" || opcion === "vp" || opcion === "vpAnt") && (
            <>
              <FormGroup label="Pago periódico (A)" value={pago} onChange={setPago} />
              <FormGroup label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
              <FormGroup label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
            </>
          )}

          {opcion === "rentaVF" && (
            <>
              <FormGroup label="Valor Futuro (VF)" value={valorFinal} onChange={setValorFinal} />
              <FormGroup label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
              <FormGroup label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
            </>
          )}

          {opcion === "rentaVP" && (
            <>
              <FormGroup label="Valor Presente (VP)" value={valorPresente} onChange={setValorPresente} />
              <FormGroup label="Tasa de interés (%)" value={tasa} onChange={setTasa} />
              <FormGroup label="Número de periodos (n)" value={periodos} onChange={setPeriodos} />
            </>
          )}
        </form>

        <button onClick={calcular} className="calculate-btn">
          Calcular
        </button>

        {resultado && (
          <div className="result-container">
            <p className="result-text">Resultado</p>
            <span className="result-value">{resultado}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Input reutilizable con estilos de la página
function FormGroup({ label, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
