import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';


export const PlayerCard = ({ use }) => {
    console.log("PlayerCard use:", use);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [playerData, setPlayerData] = useState({
        name: store.player_info?.name || '',
        gender: store.player_info?.gender || '',
        age: store.player_info?.age || '',
        rating: store.player_info?.rating || '',
        side: store.player_info?.side || '',
        hand: store.player_info?.hand || '',
        phone: store.player_info?.phone || '',
    });

    const handleChange = (e) => {
        setPlayerData({
            ...playerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!playerData.name || !playerData.gender || !playerData.age || !playerData.rating || !playerData.side || !playerData.hand) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", playerData, "use:", use);

        if (use === 'player') {
            await actions.playerPage(playerData);
        } else {
            await actions.updatePlayer(playerData);
        }

        navigate('/player/profile');
    };

    const handleCancel = e => {
        navigate('/player/profile');
    };

    return (
        <>
            {use === 'playerPage' ? (
                <div className="d-flex justify-content-center bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card shadow-lg rounded-4 p-4 w-50 h-50 m-5" style={{ maxWidth: "500px" }} >
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase mb-4 text-primary">{playerData.name || 'Nombre del Jugador'}</h5>
                            <div className="mb-3">
                                <p className="card-text">
                                    <b>Género:</b> {playerData.gender || 'No disponible'}
                                </p>
                                <p className="card-text">
                                    <b>Edad:</b> {playerData.age || 'No disponible'}
                                </p>
                                <p className="card-text">
                                    <b>Categoría:</b> {playerData.rating || 'No disponible'}
                                </p>
                                <p className="card-text">
                                    <b>Lado:</b> {playerData.side || 'No disponible'}
                                </p>
                                <p className="card-text">
                                    <b>Mano:</b> {playerData.hand || 'No disponible'}
                                </p>
                                <p className="card-text">
                                    <b>Teléfono:</b> {playerData.phone || 'No disponible'}
                                </p>
                            </div>

                            <div className="text-center">
                                <Link to="/player/editProfile">
                                    <button type="button" className="btn btn-primary w-100 rounded-pill shadow-sm">Editar Perfil</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="d-flex justify-content-center bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card shadow-lg rounded-4 p-4 h-50 w-50 m-5" style={{ maxWidth: "500px" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4 text-primary">Actualizar Perfil</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="name"><b>Nombre</b></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        value={playerData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control rounded-pill border-secondary"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="gender"><b>Género</b></label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={playerData.gender}
                                        onChange={handleChange}
                                        required
                                        className="form-control rounded-pill border-secondary"
                                    >
                                        <option value="">Selecciona un género</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="age"><b>Edad</b></label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        placeholder="Edad"
                                        value={playerData.age}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="99"
                                        className="form-control rounded-pill border-secondary"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="rating"><b>Categoría</b></label>
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={playerData.rating}
                                        onChange={handleChange}
                                        required
                                        className="form-control rounded-pill border-secondary"
                                    >
                                        <option value="">Selecciona tu categoría</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="side"><b>Lado</b></label>
                                    <select
                                        id="side"
                                        name="side"
                                        value={playerData.side}
                                        onChange={handleChange}
                                        required
                                        className="form-control rounded-pill border-secondary"
                                    >
                                        <option value="">Selecciona un lado</option>
                                        <option value="Izquierdo">Drive</option>
                                        <option value="Derecho">Revés</option>
                                        <option value="Cualquiera">Cualquiera</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="hand"><b>Mano</b></label>
                                    <select
                                        id="hand"
                                        name="hand"
                                        value={playerData.hand}
                                        onChange={handleChange}
                                        required
                                        className="form-control rounded-pill border-secondary"
                                    >
                                        <option value="">Selecciona una mano</option>
                                        <option value="Diestro">Diestro</option>
                                        <option value="Zurdo">Zurdo</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="phone"><b>Teléfono</b></label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Número de teléfono"
                                        value={playerData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{9}"
                                        className="form-control rounded-pill border-secondary"
                                    />
                                </div>
                                <div className="d-flex justify-content-evenly">
                                    <button type="submit" className="btn btn-primary w-48 rounded-pill shadow-sm">Actualizar Datos</button>
                                    <button className="btn btn-danger w-48 rounded-pill shadow-sm" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            )}
        </>

    );
};
