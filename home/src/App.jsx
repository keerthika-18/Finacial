import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Savings from "./components/Savings";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </Router>
  );
}

export default App;
