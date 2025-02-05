import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FaEuroSign, FaStar, FaCalendarAlt, FaTrophy, FaImage } from "react-icons/fa";

export const TournamentForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [tournamentData, setTournamentData] = useState({
        name: '',
        inscription_fee: '',
        rating: '',
        schedule: '',
        award: '',
        type: '',
        image: '',
        participants_amount: ''

    })

    const handleChange = e => {
        setTournamentData({
            ...tournamentData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!tournamentData.name || !tournamentData.inscription_fee || !tournamentData.rating || !tournamentData.schedule || !tournamentData.award || !tournamentData.type || !tournamentData.participants_amount) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        const info = await actions.postTournament(tournamentData);
        await actions.getTournaments()
        navigate('/tournaments/'+ info.tournament.id)
       

        // setTournamentData({
        //     name: '',
        //     inscription_fee: '',
        //     rating: '',
        //     schedule: '',
        //     award: '',
        //     type: '',
        //     image: '',
        //     participants_amount: ''
        // });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light shadow rounded" style={{ maxWidth: "500px", margin: "auto" }}>
        <h3 className="text-center mb-4">Crear Torneo</h3>

        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre del Torneo</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter tournament name" value={tournamentData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
            <label htmlFor="inscription_fee" className="form-label">Inscripción</label>
            <div className="input-group">
                <input type="number" className="form-control" id="inscription_fee" name="inscription_fee" placeholder="Enter fee" value={tournamentData.inscription_fee} onChange={handleChange} required />
                <span className="input-group-text"><FaEuroSign /></span>
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="rating" className="form-label">Categoría</label>
            <div className="input-group">
                <input type="number" className="form-control" id="rating" name="rating" placeholder="Enter rating" value={tournamentData.rating} onChange={handleChange} min="1" max="5" required />
                <span className="input-group-text"><FaStar /></span>
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="schedule" className="form-label">Fecha del Torneo</label>
            <div className="input-group">
                <input type="datetime-local" className="form-control" id="schedule" name="schedule" value={tournamentData.schedule} onChange={handleChange} required />
                <span className="input-group-text"><FaCalendarAlt /></span>
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="award" className="form-label">Premio</label>
            <div className="input-group">
                <input type="text" className="form-control" id="award" name="award" placeholder="Enter award" value={tournamentData.award} onChange={handleChange} required />
                <span className="input-group-text"><FaTrophy /></span>
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="type" className="form-label">Fases eliminatorias</label>
            <select className="form-select" id="type" name="type" value={tournamentData.type} onChange={handleChange} required>
                <option value="Semifinales">Semifinales</option>
                <option value="Cuartos de final">Cuartos de final</option>
                <option value="Octavos de final">Octavos de final</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="participants_amount" className="form-label">Participantes</label>
            <select className="form-select" id="participants_amount" name="participants_amount" value={tournamentData.participants_amount} onChange={handleChange} required>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="image" className="form-label">Cartel</label>
            <div className="input-group">
                <input type="text" className="form-control" id="image" name="image" placeholder="Enter image URL" value={tournamentData.image} onChange={handleChange} />
                <span className="input-group-text"><FaImage /></span>
            </div>
        </div>

        <div className="text-center">
            <button className="btn btn-primary w-100" type="submit"><strong>Crear</strong></button>
        </div>
    </form>
    )
}