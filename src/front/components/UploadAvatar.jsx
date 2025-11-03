import { useState } from "react"
import userServices from "../services/userServices"
import { Upload } from 'lucide-react';
import useGlobalReducer from "../hooks/useGlobalReducer";


const UploadAvatar = () => {
    const formData = new FormData()
    const [avatarUrl, setAvatarUrl] = useState()
    const [loading, setLoading] = useState(false)
    const { store, dispatch } = useGlobalReducer()

    const handleUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (!file) return
        setLoading(true)
        formData.append('avatar', file)

        userServices.uploadAvatar(formData).then(data => {
            console.log (data)
            if (data) {
                setAvatarUrl(data.url)

                const userString = localStorage.getItem("user")
                const user = JSON.parse(userString)
                user.avatarUrl = data.url
                localStorage.setItem("user", JSON.stringify(user)) //actualizamos los datos del user en local agregando la URL de perfil
                dispatch({ type: 'add_avatar', payload: data.url })
                setLoading(false)

            }

        })
    }

    return (
        <>
            <label className="photo-label mb-3 fs-4">Foto</label>
            <div className="photo-upload-container">

                <div className="avatar-circle">
                    {store?.user?.avatarUrl && <img src={store?.user?.avatarUrl} alt="Avatar" />}
                </div>

                <label htmlFor="avatar" className="upload-btn">
                    <Upload size={16} />
                    Subir foto
                </label>
                {loading && <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>}

                <input
                    type="file"
                    id="avatar"
                    className="file-input"
                    accept="image/*"
                    onChange={handleUpload}
                />
            </div>
        </>
    )


}

export default UploadAvatar