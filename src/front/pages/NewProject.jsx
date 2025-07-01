import {useState} from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export function NewProject() {
    return (
        <>
            <div className="flex-center vh-100">
                <div className="container bg-white vh-100">
                    <h1 className="text-center mb-4">Create a New Project</h1>
                </div>
            
            </div>
        </>
    );
}