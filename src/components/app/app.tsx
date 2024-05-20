import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '../../components';
import {
    ConstructorPage,
    Feed,
    ForgotPassword,
    Login,
    NotFound404,
    Profile,
    ProfileOrders,
    Register,
    ResetPassword,
} from '../../pages';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../../hoc/protected-route';
import { useDispatch } from '../../services/store';
import { checkUserAuth, getIngredients } from '../../services/actions';

import styles from './app.module.css';

import '../../index.css';

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
    }, [dispatch]);

    const { background } = location.state || {};

    return (
        <div className={styles.app}>
            <Routes location={background || location}>
                <Route path="/" element={<AppHeader />}>
                    <Route index element={<ConstructorPage />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/feed/:number" element={<OrderInfo />} />

                    <Route path="/ingredients/:id" element={<IngredientDetails />} />
                    <Route
                        path="/login"
                        element={
                            <OnlyUnAuthRoute>
                                <Login />
                            </OnlyUnAuthRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <OnlyUnAuthRoute>
                                <Register />
                            </OnlyUnAuthRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <OnlyUnAuthRoute>
                                <ForgotPassword />
                            </OnlyUnAuthRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <OnlyUnAuthRoute>
                                <ResetPassword />
                            </OnlyUnAuthRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <OnlyAuthRoute>
                                <Profile />
                            </OnlyAuthRoute>
                        }
                    />
                    <Route
                        path="/profile/orders/:number"
                        element={
                            <OnlyAuthRoute>
                                <OrderInfo />
                            </OnlyAuthRoute>
                        }
                    />
                    <Route
                        path="/profile/orders"
                        element={
                            <OnlyAuthRoute>
                                <ProfileOrders />
                            </OnlyAuthRoute>
                        }
                    />
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal title="Описание ингредиента" onClose={() => navigate(-1)}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/feed/:number"
                        element={
                            <Modal title="Информация по заказу" onClose={() => navigate(-1)}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:number"
                        element={
                            <Modal title="Информация по заказу" onClose={() => navigate(-1)}>
                                <OnlyAuthRoute>
                                    <OrderInfo />
                                </OnlyAuthRoute>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
