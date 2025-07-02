import { useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export function NewProject() {
    const { store } = useGlobalReducer();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [projectPictureUrl, setProjectPictureUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setProjectPictureUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setProjectPictureUrl("");
        }
    };

    // Si el usuario escribe una URL, se borra la imagen seleccionada
    const handleUrlChange = (e) => {
        setProjectPictureUrl(e.target.value);
        setImageFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.token,
            },
            body: JSON.stringify({
                title,
                description,
                due_date: dueDate,
                project_picture_url: projectPictureUrl,
                status,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    setError(data.msg || "An error occurred while creating the project.");
                    return;
                }
                setSuccess("Project created successfully!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            })
            .catch(() => {
                setError("Connection error with the server.");
            });
    };

    return (
        <>
            <div className="flex-center">
                <div className="container bg-white p-5">
                    <h1 className="text-center mb-4 text-dark">Create New Project</h1>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label className="form-label text-dark">Project Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter project title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-dark">Description (optional)</label>
                            <textarea
                                className="form-control"
                                value={description}
                                placeholder="Describe your project"
                                onChange={e => setDescription(e.target.value)}
                                required
                                rows={8}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label text-dark">Due Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="validationCustom04" className="form-label textdark">Status</label>
                            <select
                                className="form-select"
                                id="validationCustom04"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                required
                            >
                                <option value="yet to start">Yet to start</option>
                                <option value="in progress">In progress</option>
                                <option value="done">Done</option>
                                <option value="dismissed">Dismissed</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label text-dark">Project picture: URL or file (optional)</label>
                            <div className="d-flex gap-2">
                                <input
                                    type="url"
                                    className="form-control mb-2"
                                    style={{ maxWidth: "60%" }}
                                    placeholder="Enter image URL"
                                    value={imageFile ? "" : projectPictureUrl}
                                    onChange={handleUrlChange}
                                    disabled={!!imageFile}
                                />
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    style={{ maxWidth: "40%" }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={!!projectPictureUrl && !imageFile}
                                />
                            </div>
                            {(projectPictureUrl) && (
                                <div className="mt-2 text-center">
                                    <img
                                        src={projectPictureUrl}
                                        alt="Vista previa"
                                        style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary" type="submit">Create new Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}