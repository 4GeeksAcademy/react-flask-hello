import { Services } from "../components/Services/Services"
import { Process } from "../components/Process"
import { HeaderServices } from "../components/HeaderServices"

export const ServicesPage = () => {
    return (
        <>
            <HeaderServices />
            <Services />
            <Process />
        </>
    )
}