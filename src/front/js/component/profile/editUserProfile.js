import React, { useState } from 'react';

export const EditUserProfile = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // enviar los datos editados del usuario al servidor o realizar otras acciones necesarias
        console.log('Datos editados:', { username, name, description, profilePic });
    };

    return (
        <div className="container-md">
            <div className="coverHeader">
                <img src="https://via.placeholder.com/150" alt="Cover" />
            </div>
            <div className="topBio">
                <div className="image">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>
                <form className="detailsBio" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Username"
                        />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="Name"
                        />
                    </div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                        className="form-control mt-1"
                        placeholder="Profile Picture URL"
                    />
                    <button type="submit" className="btn btn-custom-purple border border-0 mt-2" /*onClick={handleConfirm}*/>Guardar</button>
                    <button type="button" className="btn btn-secondary border border-0 ms-2 mt-2" /*onClick={handleCancel}*/>Cancelar</button>

                </form>
            </div>
        </div>
    );
};
