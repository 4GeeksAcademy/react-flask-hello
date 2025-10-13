import { Link } from "react-router-dom"

const AuthForm = ({ color, fields }) => {


    const endMessage = fields.type == "login" ? (
        <div className={`form-text text-center ${color == "a" ? "font-color-1" : "font-color-3"}`}>
            Don't have an account?
            <Link to='/auth' className="text-decoration-none font-color-5 fw-semibold" state={{ type: 'signup' }}> Sign up</Link>
        </div>
    ) :
        (
            <div className={`form-text text-center ${color == "a" ? "font-color-1" : "font-color-3"}`}>
                Have an acocunt?
                <Link to='/auth' className="text-decoration-none font-color-5 fw-semibold" state={{ type: 'login' }}> Log in!</Link>
            </div>
        )






    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${color == "a" ? "font-color-1" : "font-color-3" } h-100 w-100`}>
            <div> <h2 className={`display-3 ${color == "a" ? "font-color-3" : "font-color-1"} mb-4 pb-5`}>{fields.title}</h2></div>
            <div className={`${color == "a" ? "back-color-3" : "back-color-1"} rounded-4  d-inline-flex px-5  py-2 shadow-lg`}>
                <form >
                    {fields.fields.map((field, indice) => {
                        return (
                            field.type == "checkbox" ?

                                <>
                                    <input className={`{field.type == "checkbox" ? "form-check-input" : "form-control"} mt-3`} id={`input-${field.fieldName}`} type={field.type}></input>
                                    <label className="form-label" htmlFor={`input-${field.fieldName}`}>{field.fieldName}</label>
                                </>
                                :
                                    <>
                                    <label className="form-label fw-semibold pt-3" htmlFor={`input-${field.fieldName}`}>{field.fieldName}</label>
                                    <input className={field.type == "checkbox" ? "form-check-input" : "form-control"} id={`input-${field.fieldName}`} type={field.type} placeholder={field.placeholder}></input>
                                </>
                        )
                    })}
                    <div className="d-flex justify-content-center mt-2">

                        <input className="btn rounded-pill button-color-4 font-color-3 " type="submit" value={fields.button} />
                    </div>
                    {endMessage}
                </form>
            </div>
        </div>
    )
}

export default AuthForm