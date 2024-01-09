
import React, { useEffect } from 'react';
import { logout } from '../actions/authentication'
import { Navigate } from "react-router-dom";

const LogoutView = () => {

    useEffect(() => {
        logout();
    }, [])
    
    return (
        <div className='fw-light'>
            <Navigate to='/' />
        </div>
    );
};

export default LogoutView;