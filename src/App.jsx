import { useState } from "react";
import "./App.css";
import { auth } from "./firebase/firabaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Bienvenido ${userCredential.user.email}`);
  } catch (error) {
    alert("Error: " + error.message);
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1>Bienvenido</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Correo</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="login-footer">
          ¿No tienes cuenta?{" "}
          <a href="#" className="link">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
