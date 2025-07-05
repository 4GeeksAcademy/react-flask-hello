import { teamContent } from "../../utils/teamContent"
import { Card } from "./Card"
import teamBg from "../../assets/img/teamBackground.png"

export const Team = () => {
    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <img src={teamBg} alt="CloudTech team background section" className="mx-auto ct-team-bg position-absolute w-100 h-100 object-fit-cover d-none d-sm-block" />
            < div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title">Conoce a nuestro equipo</h2>
                    <p className="text-white ct-description-p">Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>
                </div>
                <div className="row my-3">
                    {teamContent.map(teamMember => (
                        <div key={teamMember.id} className="col-md-6 col-lg-4 mb-4">
                            <Card
                                name={teamMember.name}
                                position={teamMember.position}
                                description={teamMember.description}
                                image={teamMember.image}
                                mailLink={teamMember.mailLink}
                                linkedinLink={teamMember.linkedinLink}
                                githubLink={teamMember.githubLink}
                            />
                        </div>
                    ))
                    }
                </div>
            </div >
        </section >
    )
}