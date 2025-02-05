import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { BracketsCard } from "../component/bracketsCard.jsx";
import { TeamCard } from "../component/TeamsCard.jsx";

export const TournamentDetails = () => {

    const { store, actions } = useContext(Context)
    const params = useParams()

    useEffect(() => {
        // Solo llamamos a getOneTournament cuando el Id cambia
        if (params.id) {
            actions.getOneTournament(params.id);
            

            console.log("Tournament ID:", params);
            console.log("token:", localStorage.getItem("token"));
            console.log("Equipos guardados:", store.torneo.teams);
            console.log("torneo", store.torneo);
            console.log("tournament", store.tournaments);

        }
    }, [params.id]);

    const handleSubmit = () => {
        if (params.id) {
            actions.registerParticipant(params.id);
        } else {
            console.error("Error: tournamentId está undefined");
        }
    };

    return (
        <>
            <div className="card">
                <div className="d-flex justify-content-around">
                    <div>
                        <figure>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
                            <figcaption className="text-center">
                                {store.torneo?.name}
                            </figcaption>
                        </figure>
                    </div>
                    <div>
                        <p>Tipo de torneo: {store.torneo?.type}</p>
                        <p>Coste de inscripción: {store.torneo?.inscription_fee}</p>
                        <p>Rating del torneo: {store.torneo?.rating}</p>
                        <p>Fecha y hora:  {new Date(store.torneo?.schedule).toLocaleString()}</p>
                        <p>Recompensas: {store.torneo?.award}</p>
                        <p>Ganador del torneo: {store.torneo?.tournament_winner}</p>
                        {/* <p>{store.torneo?.image}</p> */}
                        <p>Total de participantes: {store.torneo?.participants_amount}</p>
                        {/* <p>{store.torneo?.host}</p> */}
                        <p>Participantes registrados: {store.torneo?.participants_registered}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Participar</button>
                </div>
            </div>

            <br/>

            <div className="container d-flex flex-wrap gap-3 text-bg-success">
                {store.torneo?.participants && store.torneo.teams?.length > 0 ? (
                    store.torneo.teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))
                ) : (
                    <p>No hay equipos registrados aún.</p>
                )}

            </div>

            <br/>

            <BracketsCard tournament={store.torneo} />
        </>
    )
}
