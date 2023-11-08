import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screen/Login.jsx";
import Registro from "./screen/Registro.jsx";
import BuyScreen from "./screen/BuyScreen.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/buy/:idviaje"element={<BuyScreen />} />
    </Routes>
  </BrowserRouter>
);
