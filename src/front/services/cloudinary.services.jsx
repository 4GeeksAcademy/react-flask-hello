const backendUrl = import.meta.env.VITE_BACKEND_URL;

const cloudinaryServices = {};

cloudinaryServices.uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
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