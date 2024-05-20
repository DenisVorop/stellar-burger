import { FC, memo } from 'react';

import { BurgerConstructorElementUI } from '../../components/ui';
import { useDispatch } from '../../services/store';
import { removeIngredient, moveIngredient } from '../../services/reducers/constructor-slice';

import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
        if (index !== totalItems) {
            const newIndex = index + 1;
            dispatch(moveIngredient({ index, newIndex }));
        }
    };

    const handleMoveUp = () => {
        if (index > 0) {
            const newIndex = index - 1;
            dispatch(moveIngredient({ index, newIndex }));
        }
    };

    const handleClose = () => {
        dispatch(removeIngredient(ingredient._id));
    };

    return (
        <BurgerConstructorElementUI
            ingredient={ingredient}
            index={index}
            totalItems={totalItems}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleClose={handleClose}
        />
    );
});
