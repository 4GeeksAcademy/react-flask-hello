const BASE_URL = import.meta.env.VITE_BACKEND_URL
export const login = async (body) => {
  const response = await fetch(`${BASE_URL}api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    console.log("Error en el login:", data);
    return {data, status: response.status };
  }
  console.log(data);
  console.log(data.access_token);
  localStorage.setItem("JWT-STORAGE-KEY", data.access_token);
  return {data, status: response.status };
};

export const register = async (body) => {
  const response = await fetch(`${BASE_URL}api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json()
    return {data, status: response.status}
  }