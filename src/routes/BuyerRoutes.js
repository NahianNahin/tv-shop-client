import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoodingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';

const BuyerRoutes = ({ children }) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    if (loading || isBuyerLoading) {
        return <LoodingSpinner></LoodingSpinner>;
    }
    if (user && isBuyer) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default BuyerRoutes;