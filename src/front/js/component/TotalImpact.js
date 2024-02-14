import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import image1 from "../../img/image1.jpg";
import image2 from "../../img/image2.jpg";
import image3 from "../../img/image3.jpg";

export const TotalImpact = () => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const handleTotalImpact = async () => {
            try {
                const totalImpactData = await actions.getTotalImpact();
             
                if (totalImpactData) {
                    setIsLoading(false); 
                }
            } catch (error) {
                console.error("Error fetching total impact data", error);
            }
        }

        handleTotalImpact();
    }, []);

    return (  
		<div className="info container mt-5 mb-5 overflow-hidden">
			<h2><strong>OUR IMPACT IN THE WORLD</strong></h2>
			<div className="info__bubbles">
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_users}</strong>cleaners registered on our platform
					</div>
					<img className="info__img" src={image1} />
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_impact_liters}</strong>liters collected from our shores
					</div>
					<img className="info__img" src={image2} />
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_impact_time}</strong>time dedicated to the cause
					</div>
					<img className="info__img" src={image3} />
				</div>
			</div>
		</div>
    )
};