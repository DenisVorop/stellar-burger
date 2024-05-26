import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getErrorMessage } from '../../services/selectors';
import { LoginUI } from '../../components/ui/pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/actions';

export const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const errorMessage = useSelector(getErrorMessage) || undefined;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        if (!errorMessage) {
            navigate(location.state?.from || { pathname: '/' });
        }
    };

    return (
        <LoginUI
            errorText={errorMessage}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};
