import { teamContent } from "../../utils/teamContent"
import { Card } from "./Card"
import teamBg from "../../assets/img/teamBackground.png"
import { useTranslation } from "react-i18next"

export const Team = () => {
    const { t } = useTranslation();

    return (
        <section className="d-flex justify-content-center position-relative">
            <img src={teamBg} alt="CloudTech team background section" className="mx-auto ct-team-bg position-absolute w-100 h-100 object-fit-cover d-none d-sm-block" />
            < div className="container py-4">
                <div className="d-flex flex-column text-center justify-content-center mb-4">
                    <h2 className="section-title">{t('team.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">{t('team.sectionDescription')}</p>
                </div>
                <div className="row my-3">
                    {teamContent.map(teamMember => (
                        <div key={teamMember.id} className="col-md-6 col-lg-4 mb-4">
                            <Card
                                name={teamMember.name}
                                position={t(teamMember.position)}
                                description={t(teamMember.description)}
                                image={teamMember.image}
                                catImage={teamMember.catImage}
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