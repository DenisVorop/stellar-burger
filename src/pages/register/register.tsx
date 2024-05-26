import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RegisterUI } from '../../components/ui/pages';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/actions';
import { getErrorMessage } from '../../services/selectors';

export const Register: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const errorMessage = useSelector(getErrorMessage) || '';

    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register({ email, password, name }));

        if (!errorMessage) {
            navigate(location.state?.from || { pathname: '/' });
        }
    };

    return (
        <RegisterUI
            errorText={errorMessage}
            email={email}
            userName={name}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
        />
    );
};
