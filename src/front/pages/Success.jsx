import { useNavigate } from "react-router-dom"
import logo from "../assets/img/Logo.png"


const SuccessPayment = () => {

    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/')
    }, 5000)


    return (

        <section className="pago-procesado">
            <figure>
                <img src={logo} alt="Spidys" />
            </figure>
            <p className="lead fs-1">
                Gracias por su compra!
            </p>

            <p className="lead fs-2">Se ha completado el pago, sera redirigido a home automaticamente</p>

        </section>

    )
}

export default SuccessPayment