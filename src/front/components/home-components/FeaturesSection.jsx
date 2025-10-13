import FeatureCard from "./features-section-components/FeatureCard"

const FeaturesSection = () => {

    const featureCardsInfo =[
        {title:"My Missions", description: "Create your personal tasks. Each one is a mission for Claude Stay focused, stay disciplined.", buttonText: "Add mission", imgUrl:"https://dibujosycolores.com/objetos/sol/sol-9.jpg"},
        {title:"Crew Missions", description: "Team up with friends and share your goals.Each member adds strength to the voyage. ", buttonText: "Invite Friends", imgUrl: "https://static.vecteezy.com/system/resources/previews/003/626/222/non_2x/moon-coloring-book-for-kids-cheerful-character-illustration-cute-cartoon-style-hand-drawn-fantasy-page-for-children-isolated-on-white-background-vector.jpg"},
        {title:"Completed Tasks", description: "Review your finished missions and celebrate your progress together", buttonText: "View Completed", imgUrl:"https://img.freepik.com/vector-premium/alegre-dibujo-estrellas-libro-ninos-pequenos_925324-4980.jpg?semt=ais_hybrid&w=740&q=80"}
    ]


    return (
        <div className="bg-body-tertiary w-100 rounded-4 mt-5">
            <div className="row my-5 py-5 gy-lg-0 gy-3">
                {
                    featureCardsInfo.map((card, index)=>{
                        return(
                            <FeatureCard title={card.title} description={card.description} buttonText={card.buttonText} imgUrl={card.imgUrl} last={index == featureCardsInfo.length - 1}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default FeaturesSection