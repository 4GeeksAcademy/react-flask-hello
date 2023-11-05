import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";
import { KeeperForm } from "../component/keeperForm";
import  { Pets } from "../component/pets";

export const Profile = (props) => {
	const { store, actions } = useContext(Context);
	const params = useParams();

    // useEffect(()=>{
    //     actions.getPets();
    // },[])
    //TEST DATA
    let owner_id = 1;
    let user_type = "owner";

	return (
		<div className="text-center container w-75 my-2">
			<div className="align-items-center justify-content-center row mb-2">
                <img src={stock_avatar} style={{borderRadius:"50%", width:"auto", height:"35vh", objectFit:"contain"}}/>
            </div>
			<div className="row d-flex flex-row flex-wrap justify-content-between mb-2">
                <h2>Maria Laura</h2>
                <h3><i class="fa-solid fa-location-dot"></i> Miami, Fl</h3>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around mb-2">
                <div className="d-block">
                    <p><strong>Age</strong></p>
                    <p>24</p>
                </div>
                <div className="d-block">
                    <p><strong>Experience</strong></p>
                    <p>3+ years</p>
                </div>
                <div className="d-block">
                    <p><strong>Services</strong></p>
                    <ul style={{textAlign:"left"}}>
                        <li>Dog walker</li>
                        <li>Pet sitter</li>
                    </ul>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>About me</strong></h3>
                <p>Pets are the main reason people require sitters and so their welfare is my main priority and I spend much of the time in their company at your home following your instructions meticulously.

I have had numerous cats since I was young and am definitely a cat lover. Through house and pet sitting, I have had the pleasure of looking after and loving many cats, from young kittens to 22 year olds, all with different personalities and some requiring medication; as well as different breeds of dogs, from Labradors to miniature cavoodles, all whose company I thoroughly enjoyed. I also had Beau, my budgie, for quite a few years and taught him to talk! Libby, my sister, who sometimes accompanies me on sits, has had dogs for pets, from a German shepherd to a silky terrier, a cat and a budgie.</p>
            </div>
            <hr className="mt-4 mb-2" />
            {/* Componente condicional aqui, pasar user type por props */}
            {(user_type == "owner"? < Pets owner_id={1} />:<KeeperForm />)}
		</div>
	);
};
