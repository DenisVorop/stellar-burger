import { forwardRef, useMemo } from 'react';

import { getConstructorBun, getConstructorIngredients } from '../../services/selectors';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategoryProps>(
    ({ title, titleRef, ingredients }, ref) => {
        const bun = useSelector(getConstructorBun);
        const constructorIngredients = useSelector(getConstructorIngredients);

        const ingredientsCounters = useMemo(() => {
            const counters = constructorIngredients?.reduce<Record<string, number>>((acc, { _id }) => {
                acc[_id] = !acc[_id] ? 1 : ++acc[_id];
                return acc;
            }, {});

            if (bun?._id) counters[bun._id] = 2;

            return counters;
        }, [bun, constructorIngredients]);

        return (
            <IngredientsCategoryUI
                title={title}
                titleRef={titleRef}
                ingredients={ingredients}
                ingredientsCounters={ingredientsCounters}
                ref={ref}
            />
        );
    },
);
