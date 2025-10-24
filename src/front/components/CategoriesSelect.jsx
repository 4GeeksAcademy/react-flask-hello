import Select from "react-select"

const CategoriesSelect = ({ value, onChange, options }) => {
/*
    const options = [
        { value: "webdev", label: "Desarrollo Web" },
        { value: "ia", label: "Inteligencia Artificial" },
        { value: "datasci", label: "Ciencia de Datos" },
        { value: "cyber", label: "Ciberseguridad" },
        { value: "mobile", label: "Desarrollo Móvil" },
        { value: "devops", label: "DevOps" },
        { value: "uiux", label: "Diseño UI/UX" },
    ]
*/
    return (
        <div>
            <label className="form-label fw-bold">Categorías de interés</label>
            <Select
                isMulti
                options={options}
                value={value}
                onChange={onChange}
                placeholder="Selecciona tus temas de intereses..."
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );


}

export default CategoriesSelect