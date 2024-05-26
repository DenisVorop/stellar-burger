import { FC } from 'react';

import { useSelector } from '../../services/store';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
    const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);

    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <main className={styles.containerMain}>
                    <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>Соберите бургер</h1>
                    <div className={`${styles.main} pl-5 pr-5`}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </main>
            )}
        </>
    );
};
