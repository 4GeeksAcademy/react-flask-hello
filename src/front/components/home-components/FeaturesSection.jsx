import FeatureCard from "./features-section-components/FeatureCard"

const FeaturesSection = () => {

    const featureCardsInfo =[
        {title:"My Missions", description: "Create your personal tasks. Each one is a mission for Claude Stay focused, stay disciplined.", buttonText: "Add mission", imgUrl:"https://i.pinimg.com/1200x/2a/f3/80/2af38020e23fa0140b878d5ecd9fc9e8.jpg"},
        {title:"Crew Missions", description: "Team up with friends and share your goals.Each member adds strength to the voyage. ", buttonText: "Invite Friends", imgUrl: "https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/jp/news/2024/02/01/jdo4wRztSJiSPhhJ/44%E3%80%8063_032.png"},
        {title:"Completed Tasks", description: "Review your finished missions and celebrate your progress together", buttonText: "View Completed", imgUrl:"https://i.pinimg.com/736x/e2/df/18/e2df18b18ebda2a4b67b762f8599d60a.jpg"}
    ]


    return (
        <div className="bg-light w-100 rounded-4">
            <div className="row my-5 py-2 gy-lg-0 gy-5">
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