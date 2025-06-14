import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import CardPlan from "../components/CardPlan";

import "../../styles/sportUser.css";

const datosSport = {
    Lunes: {
        Desayuno: "Café con leche desnatada + Tostada integral con queso fresco",
        Almuerzo: "Sandía",
        ejercicio: "Arroz integral con tomate triturado y un huevo a la plancha",
        Merienda: "Yogur desnatado + 3 nueces",
        Cena: "Canónigos, pechuga de pavo a la plancha, tomate y maíz"
    },
    Martes: {
        Desayuno: "Café con leche desnatada + Cereales integrales",
        Almuerzo: "Macedonia de frutas (fresas, kiwi y piña)",
        ejercicio: "Salchichas de pollo + Espinacas",
        Merienda: "1 batido (leche de soja, fresas y plátano)",
        Cena: "Merluza a la plancha con ensalada"
    },
    Miércoles: {
        Desayuno: "Café con leche desnatada + Tostada integral de pavo",
        Almuerzo: "1 manzana",
        ejercicio: "Merluza y espárragos verdes a la plancha",
        Merienda: "Yogur desnatado + 3 nueces",
        Cena: "Tortilla francesa con pavo, tomate y pepino"
    },
    Jueves: {
        Desayuno: "Café con leche desnatada + Cereales integrales",
        Almuerzo: "Sandía",
        ejercicio: "Lentejas (sin chorizo)",
        Merienda: "1 batido (leche de soja, fresas y plátano)",
        Cena: "Ensalada de canónigos, pechuga de pavo, pepino y tomate"
    },
    Viernes: {
        Desayuno: "Café con leche desnatada + Tostada integral con queso fresco",
        Almuerzo: "1 manzana",
        ejercicio: "Parrillada de verduras con arroz integral",
        Merienda: "Yogur desnatado + 3 nueces",
        Cena: "Puré de calabaza + Infusión"
    },
    Sábado: {
        Desayuno: "Café con leche desnatada + Cereales integrales",
        Almuerzo: "Sandía",
        ejercicio: "Pollo con patata y zanahoria (al horno)",
        Merienda: "Tortita de arroz + 2 onzas de chocolate",
        Cena: "Libre"
    },
    Domingo: {
        Desayuno: "Café con leche desnatada + Tostada integral de pavo",
        Almuerzo: "1 zumo de naranja",
        ejercicio: "Dorada al horno + Tomate y pepino",
        Merienda: "Yogur desnatado + 3 nueces",
        Cena: "Ensalada tropical (rúcula, kiwi y piña)"
    }
};

const SportUser = () => {
    const [diaActivo, setDiaActivo] = useState("Lunes");

    return (
        <div className="sport-user container mt-5 ">

            <section className="sport-header text-center py-5">
                <h1 className="display-4">Deporte Personalizado</h1>
                <p className="lead">
                    Mejora tu salud con planes de deporte adaptados a tus objetivos.
                </p>
            </section>

      <section className="tabla-sport my-5">
        <h1 className="text-center subtittle mb-4">Plan Semanal de Ejercicios</h1>

        <div className="button d-flex justify-content-center flex-wrap mb-4">
          {Object.keys(datosSport).map((dia) => (
            <button
              key={dia}
              onClick={() => setDiaActivo(dia)}
              className={`btn mx-1 mb-2 ${
                dia === diaActivo ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="card p-2">
          <h2 className="mb-4 text-center">{diaActivo}</h2>
          <ul className="list-group">
            {Object.entries(datosSport[diaActivo]).map(
              ([ejercicio, texto]) => (
                <li key={ejercicio} className="list-group-item">
                  <strong>{ejercicio}:</strong> {texto}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

            <section className="beneficios my-5">
                <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
                <ul className="list-group list-group-flush caja-bot">
                    <li className="list-group-item">🏋️ Asesoramiento personalizado</li>
                    <li className="list-group-item">🏃 Rutinas adaptadas a tu nivel</li>
                    <li className="list-group-item">📈 Progreso monitorizado</li>
                </ul>
            </section>

        </div>
    );
};
export default SportUser;