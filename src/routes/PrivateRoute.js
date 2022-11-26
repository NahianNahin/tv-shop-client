import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoodingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({children}) => {

    const location = useLocation();
    const {user,loading} = useContext(AuthContext);
    if(loading){
        return <LoodingSpinner></LoodingSpinner>;
    }
    if(user || user?.uid){
        return children;
    }
    return <Navigate to='/login' state ={{from: location}} replace></Navigate>
};

export default PrivateRoute;