const URLBACK = import.meta.env.VITE_BACKEND_URL

export const get_products = async () => {
  try {
    const response = await fetch(`${URLBACK}api/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
export const get_product = async (id) => {
  try {
    const response = await fetch(`${URLBACK}api/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw the error for further handling
  }
}