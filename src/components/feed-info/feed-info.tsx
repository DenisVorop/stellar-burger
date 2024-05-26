import { FC } from 'react';

import { TOrder } from '../../utils/types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
    orders.reduce<number[]>((acc, cur, index) => {
        if (index >= 20) return acc;
        if (cur.status !== status) return acc;

        acc.push(cur.number);
        return acc;
    }, []);

export const FeedInfo: FC = () => {
    const feed = useSelector((state) => ({
        total: state.feedsReducer.orders?.total,
        totalToday: state.feedsReducer.orders?.totalToday,
    }));
    const orders: TOrder[] = useSelector((state) => state.feedsReducer.orders?.orders || []);

    const readyOrders = getOrders(orders, 'done');
    const pendingOrders = getOrders(orders, 'pending');

    return <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />;
};
