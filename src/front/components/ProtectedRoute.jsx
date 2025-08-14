import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    return token ? children : <Navigate to="/" />
};