import { useNavigate } from "react-router-dom"
import logo from "../assets/img/Logo.png"


const CancelPayment = () => {

    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/')
    }, 3000)

    return (

        <section className="pago-procesado">
            <figure>
                <img src={logo} alt="Spidys" />
            </figure>
            <p className="lead fs-1">
                Se ha cancelado su compra satisfactoriamente!
            </p>

            <p className="lead fs-2">Se ha cancelado la compra, sera redirigido a home automaticamente</p>

        </section>
    )
}


export default CancelPayment