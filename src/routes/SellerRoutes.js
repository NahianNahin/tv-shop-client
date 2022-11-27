import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoodingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../contexts/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoutes = ({ children }) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    if (loading || isSellerLoading) {
        return <LoodingSpinner></LoodingSpinner>;
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoutes;