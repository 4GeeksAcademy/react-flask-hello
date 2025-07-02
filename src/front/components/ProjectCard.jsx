import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export const ProjectCard = ({ project, onEdit }) => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const {
    id,
    title,
    description,
    due_date,
    status,
    project_picture_url,
    admin_full_name,
    admin_id,
    members,
  } = project;

  const formattedDate = new Date(due_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const statusLabel = status ? status[0].toUpperCase() + status.slice(1) : '';

  const isAdmin = store.user.id === admin_id;  
  

  return (
    <div className="card shadow-sm rounded-3 p-3 mb-4">
      <div className="d-flex justify-content-between align-items-start">
        {/* Project Icon */}
        <img
          src={
            project_picture_url ||
            'https://placehold.co/40x40/png?text=No+Image'
          }
          alt="Project icon"
          className="rounded"
          style={{ width: 40, height: 40 }}
        />

        <div className="d-flex flex-column align-items-end">
          {/* Status Badge */}
          <span className="badge bg-primary text-capitalize mb-2">
            {statusLabel}
          </span>

          {/* Edit Button for Admin */}
          {isAdmin && (
            <button
              className="btn btn-sm btn-outline-warning mb-2"
              onClick={() => { navigate(`/projects/${id}/edit`) }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h5 className="mt-3 mb-1 fw-bold">{title}</h5>
      <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
        {description || 'No description provided.'}
      </p>

      {/* Due Date & Budget */}
      <div className="d-flex gap-4 mb-3">
        <div>
          <small className="text-muted">Due Date</small>
          <div className="fw-semibold">{formattedDate}</div>
        </div>
        
      </div>

      {/* Admin & Members */}
      <div className="d-flex align-items-center">
        <div className="me-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              admin_full_name
            )}&background=random`}
            alt={admin_full_name}
            className="rounded-circle"
            width="32"
            height="32"
          />
        </div>
        {members.length > 0 &&
          members.slice(0, 2).map((member, idx) => (
            <div className="me-2" key={idx}>
              
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.full_name || `M${idx + 1}`
                )}&background=0D8ABC&color=fff`}
                alt={member.full_name || `Member ${idx + 1}`}
                className="rounded-circle"
                width="32"
                height="32"
              />
            </div>
          ))}
        {members.length > 2 && (
          <span className="badge bg-secondary">+{members.length - 2}</span>
        )}
      </div>
    </div>
  );
};
