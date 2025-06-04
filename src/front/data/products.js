const URLBACK = import.meta.env.VITE_BACKEND_URL

export const get_products = async () => {
  const resp = await fetch(`${URLBACK}api/products`)
  const data = resp.json()
  console.log(data)
}

