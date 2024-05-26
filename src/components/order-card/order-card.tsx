import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TIngredient } from '../../utils/types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';

import { OrderCardProps } from './type';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
    const location = useLocation();

    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);

    const orderInfo = useMemo(() => {
        if (!ingredients.length) return;

        const ingredientsInfo = order.ingredients.reduce<TIngredient[]>((acc, item) => {
            const ingredient = ingredients.find(({ _id }) => _id === item);

            if (!ingredient) return acc;

            acc.push(ingredient);
            return acc;
        }, []);

        const total = ingredientsInfo.reduce((acc, { price }) => acc + price, 0);

        const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

        const remains = ingredientsInfo.length > maxIngredients ? ingredientsInfo.length - maxIngredients : 0;

        const date = new Date(order.createdAt);

        return {
            ...order,
            ingredientsInfo,
            ingredientsToShow,
            remains,
            total,
            date,
        };
    }, [order, ingredients]);

    if (!orderInfo) return null;

    return (
        <OrderCardUI orderInfo={orderInfo} maxIngredients={maxIngredients} locationState={{ background: location }} />
    );
});
