import { AboutUs } from "../components/Team/AboutUs"
import { Team } from "../components/Team/Team"
import { Process } from "../components/Process"
import { HeaderAbout } from "../components/HeaderAbout"

export const About = () => {
    return (
        <>
            <HeaderAbout />
            <AboutUs />
            <Team />
            <Process />
        </>

    )
}