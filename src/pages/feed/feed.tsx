import { FC, useEffect } from 'react';

import { Preloader } from '../../components/ui';
import { FeedUI } from '../../components/ui/pages';
import { TOrder } from '../../utils/types';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/actions';

export const Feed: FC = () => {
    const orders: TOrder[] = useSelector((state) => state.feedsReducer.orders?.orders) || [];
    const isLoading = useSelector((state) => state.feedsReducer.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    const handleGetFeeds = () => {
        dispatch(getFeeds());
    };

    if (isLoading) {
        return <Preloader />;
    }

    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
