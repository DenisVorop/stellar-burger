import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '../ui';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger } from '../../services/actions';
import { clearConstructor, clearOrder } from '../../services/reducers/constructor-slice';
import { getOrderRequest, getUser, getOrderData } from '../../services/selectors';

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const constructorItems = useSelector((state) => state.constructorReducer);
    const orderRequest = useSelector(getOrderRequest);
    const user = useSelector(getUser);
    const orderModalData = useSelector(getOrderData);

    const onOrderClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        const { bun, ingredients } = constructorItems;

        if (!bun || !ingredients.length) {
            return;
        }

        const order: string[] = [bun._id, ...ingredients.map(({ _id }) => _id), bun._id];
        dispatch(orderBurger(order));
        dispatch(clearConstructor());
    };

    const closeOrderModal = () => {
        navigate('/', { replace: true });
        dispatch(clearOrder());
    };

    const price = useMemo(
        () =>
            (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
            (constructorItems.ingredients || []).reduce((acc, { price }) => acc + price, 0),
        [constructorItems],
    );

    return (
        <BurgerConstructorUI
            price={price}
            orderRequest={orderRequest}
            constructorItems={constructorItems}
            orderModalData={orderModalData}
            onOrderClick={onOrderClick}
            closeOrderModal={closeOrderModal}
        />
    );
};
