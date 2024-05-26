import { FC, useEffect } from 'react';

import { getUserOrders } from '../../services/selectors';
import { ProfileOrdersUI } from '../../components/ui/pages';
import { TOrder } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/store';
import { ordersUser } from '../../services/actions';

export const ProfileOrders: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ordersUser());
    }, []);

    const orders: TOrder[] = useSelector(getUserOrders);

    return <ProfileOrdersUI orders={orders} />;
};
