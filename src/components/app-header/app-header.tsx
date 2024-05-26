import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { getUserName } from '../../services/selectors';
import { AppHeaderUI } from '../../components/ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
    const userName = useSelector(getUserName);

    return (
        <>
            <AppHeaderUI userName={userName} />
            <Outlet />
        </>
    );
};
