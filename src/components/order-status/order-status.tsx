import { FC } from 'react';

import { OrderStatusUI } from '../../components/ui';

import { OrderStatusProps } from './type';

const statusText = {
    pending: 'Готовится',
    done: 'Выполнен',
    created: 'Создан',
} as const;

const colorsMap = {
    danger: '#E52B1A',
    success: '#00CCCC',
    default: '#F2F2F3',
} as const;

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
    let textStyle: (typeof colorsMap)[keyof typeof colorsMap] = colorsMap.default;
    switch (status) {
        case 'pending':
            textStyle = colorsMap.danger;
            break;
        case 'done':
            textStyle = colorsMap.success;
            break;
        default:
            textStyle = colorsMap.default;
    }

    if (!textStyle) return;

    return <OrderStatusUI textStyle={textStyle} text={statusText[status as keyof typeof statusText]} />;
};
