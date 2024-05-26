import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getIngredients, getSelectedOrders } from '../../services/selectors';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/store';
import { orderByNumber } from '../../services/actions';
import { clearSelectedOrders } from '../../services/reducers/order-number-slice';

export const OrderInfo: FC = () => {
    const { number } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderByNumber(Number(number)));
        return () => {
            dispatch(clearSelectedOrders());
        };
    }, []);

    const selectedOrders = useSelector(getSelectedOrders);
    const ingredients = useSelector(getIngredients);

    const [orderData] = selectedOrders || [];

    /* Готовим данные для отображения */
    const orderInfo = useMemo(() => {
        if (!orderData || !ingredients.length) return null;

        const date = new Date(orderData.createdAt);

        const ingredientsInfo = orderData.ingredients.reduce<Record<string, TIngredient & { count: number }>>(
            (acc, id) => {
                if (!acc[id]) {
                    const ingredient = ingredients.find((ing) => ing._id === id);

                    if (ingredient) {
                        acc[id] = {
                            ...ingredient,
                            count: 1,
                        };
                    }
                } else {
                    acc[id].count++;
                }

                return acc;
            },
            {},
        );

        const total = Object.values(ingredientsInfo).reduce((acc, item) => acc + item.price * item.count, 0);

        return {
            ...orderData,
            ingredientsInfo,
            date,
            total,
        };
    }, [orderData, ingredients]);

    if (!orderInfo) {
        return <Preloader />;
    }

    return <OrderInfoUI orderInfo={orderInfo} />;
};
