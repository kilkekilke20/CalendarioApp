import React, { useEffect, useState } from 'react';
import logo from '../img/logo.svg';
import '../css/ModoOscuroClaro.css';

//esta funcion se encarga de hacer el modo oscuro de la pagina
export const ModoOscuroClaro = () => {

    const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);

    //guarda el estado del chebox en el localStorage
    useEffect(() => {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
    }, [checked]);
  
    //seleccionar el tipo de fondo
    const toggleThemeChange = () => {
      if (checked === false) {
        localStorage.setItem("theme", "dark");
        
        setChecked(true);
      } else {
        localStorage.setItem("theme", "light");
  
        setChecked(false);
      }
    }
    return (
        <div>
            <img src={logo} className="ModoOscuroClaro-logo" alt="logo" />
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={() => toggleThemeChange()}
              />
              <span className="slider round">Modo Noche</span>
            </label>
        </div>
      );
}
