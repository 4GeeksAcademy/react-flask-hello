const backendUrl = import.meta.env.VITE_BACKEND_URL;

const cloudinaryServices = {};

cloudinaryServices.uploadImage = async (file, { avatar = false, product = false }, product_id = {}) => {
    const formData = new FormData();
    formData.append("file", file);
    if (avatar) formData.append("upload_preset", "avatar");
    if (product){ 
        formData.append("upload_preset", "product");
        formData.append("product_id", product_id);
    }
    const resp = await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Error ${resp.status}: ${text}`);
    }
    return resp.json();
};

export default cloudinaryServices;