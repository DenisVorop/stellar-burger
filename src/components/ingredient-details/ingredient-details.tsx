import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { getIngredients } from '../../services/selectors';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
    const { id } = useParams();
    const ingredients = useSelector(getIngredients);
    const ingredientData = ingredients.find(({ _id }) => _id === id);

    if (!ingredientData) {
        return <Preloader />;
    }

    return <IngredientDetailsUI ingredientData={ingredientData} />;
};
