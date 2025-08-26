// src/front/mock/users.js
const demo = {
  id: 1,
  username: "demo",
  first_name: "Demo",
  last_name: "",
  tagline: "Mini bio (mock)",
  location: "CDMX, MX",
  email: "prueba1@gmail.com",
  description: "Descripción demo",
  avatar_url: "",
  roles: ["client", "tasker"],
};

export async function getUserByUsername(username) {
  await new Promise(r => setTimeout(r, 300)); // latencia mock
  return { ...demo, username };
}