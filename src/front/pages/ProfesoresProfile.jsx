import teacher from '../assets/img/teacher.png';
import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthProvider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const ProfesoresProfile = () => {
    const [user, setUser] = useState([])
    const [load, setLoad] = useState(false)
    const [coords, setCoords] = useState(null);
    const { store } = useAuth();
    const token = store.access_token;

    useEffect(() => {
        const user = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setUser(data)
                    setLoad(true)
                }
            } catch (error) {
                console.log(error);

            }
        }
        user()
    }, [])

    useEffect(() => {
        const latLon = async () => {
            if (!user.location) return;

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(user.location)}`);
                const data = await response.json();
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    setCoords([lat, lon]);
                    console.log([lat, lon]);

                } else {
                    console.log("No se encontró la dirección");
                }
            } catch (error) {
                console.error(error);
            }
        }
        latLon()
    }, [user])
    return (
        <div className="container my-5">
            {load ?
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                        <h2 className="mb-4 text-center"> Bienvenido {user.first_name} {user.last_name}</h2>
                        <img src={teacher} className="img-profile rounded-circle shadow img-thumbnail object-fit-cover" alt="" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-5">
                        <h5 className="fw-bold mb-3">Información básica</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><div className="fw-bold">Nombres:</div>{user.first_name}</li>
                            <li className="list-group-item"><div className="fw-bold">Apellidos:</div>{user.last_name}</li>
                            <li className="list-group-item"><div className="fw-bold">Correo:</div>{user.email}</li>
                            <li className="list-group-item"><div className="fw-bold">Teléfono:</div>{user.teacher.phone}</li>
                            <li className="list-group-item"><div className="fw-bold">Dirreccion:</div>{user.location}</li>
                            <li className="list-group-item"><div className="fw-bold">Materia:</div>{user.teacher.courses[0].name}</li>
                            <li className="list-group-item"><div className="fw-bold">ID:</div>{user.id}</li>
                        </ul>
                    </div>
                    {coords && (
                        <div className="mt-4 setIndex">
                            <h5 className="fw-bold mb-3">Ubicación estimada</h5>
                            <MapContainer
                                center={coords}
                                zoom={15}
                                scrollWheelZoom={false}
                                style={{ height: '25rem', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={coords}>
                                    <Popup>
                                        {user.first_name} {user.last_name}<br />{user.location}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    )}
                </div>
                :
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
        </div>
    );
};