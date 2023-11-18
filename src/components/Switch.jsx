import React from 'react'
import '../styles/switch.css'
import { useState, useEffect } from "react";

export const Switch = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
}, [theme]);

  const handleChange = (e) => setTheme(e.target.checked ? "dark" : "light");
  return (
    <div className="container-switch">
      <span>Cambia el Tema </span>
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={theme === 'dark'}/>
        <span className="slider"></span>
      </label>
    </div>
  );
};