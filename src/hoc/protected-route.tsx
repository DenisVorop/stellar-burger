import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { getIsAuthChecked, getUser, getUserRequest } from '../services/selectors';
import { useSelector } from '../services/store';
import { Preloader } from '../components/ui';

const ProtectedRoute = ({ onlyUnAuth = false, children }: { onlyUnAuth?: boolean; children: ReactNode }) => {
    const location = useLocation();
    const user = useSelector(getUser);
    const isAuthChecked = useSelector(getIsAuthChecked);
    const userRequest = useSelector(getUserRequest);

    if (!isAuthChecked || userRequest) {
        return <Preloader />;
    }
    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    return children;
};

export const OnlyAuthRoute = ProtectedRoute;

export const OnlyUnAuthRoute = ({ children }: { children: ReactNode }) => (
    <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
);
