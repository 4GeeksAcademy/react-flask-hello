import { useNavigate } from "react-router-dom"

const MenuItem = ({ item, isActive, onClick, userRole }) => {
    const Icon = item.icon
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("🔵 Click en:", item.label)      // ← Ahora sí se ejecuta al hacer click
        console.log("📍 Path:", item.path)
        console.log("✅ onClick función:", onClick)
        onClick(item.path)  // Ejecuta el cambio de ruta
        navigate(`/dashboard/${userRole}${item.path}`)
    }



    return (
        <button
            onClick={handleClick}

            className={`menu-item w-100 d-flex align-items-center gap-2  border-0 rounded ${isActive ? 'menu-item-active' : ''
                }`}
        >
            <Icon size={20} />
            <span className="font-medium">{item.label}</span>
        </button>
    )


}

export default MenuItem