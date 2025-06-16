import React from "react";
import Mapa from "./Mapa";

function Partners() {
  const markers = [
    {
      id: 1,
      name: "Madrid",
      position: { lat: 40.411882, lng: -3.687112 },
    },
    {
      id: 2,
      name: "Barcelona",
      position: { lat: 41.387785, lng: 2.185822 },
    },
    {
      id: 3,
      name: "Talavera de la Reina",
      position: { lat: 39.959734, lng: -4.822666 },
    },
        {
      id: 4,
      name: "Core Madrid",
      position: { lat: 40.423152991054124, lng: -3.6794869588958217 },
    },
        {
      id: 5,
      name: "Anytime",
      position: { lat: 40.40150320992329, lng: -3.6993885049849573 },
    },
        {
      id: 6,
      name: "Body Factory",
      position: { lat: 40.42672817395056, lng: -3.713464737547257 },
    },
            {
      id: 7,
      name: "Bodyproject",
      position: { lat: 42.861982191165716, lng: -8.588280095473968 },
    },
            {
      id: 8,
      name: "Fitnes Park Bilbao",
      position: { lat: 43.26373435567808, lng: -2.950809787222863 },
    },
            {
      id: 9,
      name: "Metropolitan",
      position: { lat: 43.31453185073691, lng: -1.997013365213812 },
    },
            {
      id: 11,
      name: "Cuzco Gym",
      position: { lat: 39.47605056903364, lng: -0.3789720128182524 },
    },
            {
      id: 12,
      name: "Fitnes Park Valencia",
      position: { lat: 39.46037702417662, lng: -0.34532685062006196 },
    },
            {
      id: 13,
      name: "Gym Sparta",
      position: { lat: 37.99767957829444, lng: -1.1445592345683817 },
    },        {
      id: 14,
      name: "Gimnasio Formas",
      position: { lat: 37.97826500556441, lng: -1.1291955417107495 },
    },
            {
      id: 15,
      name: "VivaGym",
      position: { lat: 36.723819931179385, lng: -4.428752546510084 },
    },
            {
      id: 16,
      name: "Anytime Fitness",
      position: { lat: 36.69697284411918, lng: -4.452714552379815 },
    },
            {
      id: 17,
      name: "Basic-Fit",
      position: { lat: 36.523094112193014, lng: -6.276212961464802 },
    },        {
      id: 18,
      name: "Sevilla Gym",
      position: { lat: 37.400171616815406, lng: -5.994676103226239 },
    },        {
      id: 19,
      name: "02 Centro Wellness",
      position: { lat: 37.26157740453859, lng: -6.945779678483276 },
    },        {
      id: 20,
      name: "AltaFit",
      position: { lat: 39.47209853214048, lng: -6.376724474020622 },
    },        {
      id: 21,
      name: "Synergym ",
      position: { lat: 38.999089809496894, lng: -1.8530943018304284 },
    },
  ];

  return (
    <div className="d-flex justify-content-center">
      <Mapa markers={markers} />
    </div>
  );
}
export default Partners;