import React from 'react';
import '../../styles/accountpage.css'

function TeamList() {
  const teamsData = [
    {
      id: 1,
      name: 'Equipo juvenil',
      country: 'Colombia',
      registrationDate: '13/11/2023',
      cost: '$75',
    },
    {
      id: 2,
      name: 'Equipo varonil 3',
      country: 'Las Vegas',
      registrationDate: '13/11/2024',
      cost: '$50',
    },
    {
      id: 3,
      name: 'Equipo campeones',
      country: 'Costa Rica',
      registrationDate: '13/11/2025',
      cost: '$80',
    },
  ];

  return (
    <div className="contSuperior">
      <table className="table align-middle mb-0 bg-white" id='teamstable'>
        <thead className="bg-light">
          <tr>
            <th>Nombre del equipo</th>
            <th>País</th>
            <th>Fecha de registro</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team) => (
            <tr key={team.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`https://mdbootstrap.com/img/new/avatars/${team.id}.jpg`}
                    alt=""
                    style={{ width: '45px', height: '45px' }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{team.name}</p>
                    <p className="text-muted mb-0">{team.country}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{team.country}</p>
              </td>
              <td>{team.registrationDate}</td>
              <td>{team.cost}</td>
              <td>
              <td>
            <button className="btn btn-primary">
              Editar
            </button>
          </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default TeamList;
