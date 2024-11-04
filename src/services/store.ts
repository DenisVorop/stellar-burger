import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import ingredientsReducer from './reducers/ingredients-slice';
import constructorReducer from './reducers/constructor-slice';
import feedsReducer from './reducers/feeds-slice';
import authReducer from './reducers/auth-slice';
import userOrdersReducer from './reducers/orders-slice';
import orderNumberReducer from './reducers/order-number-slice';

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    feedsReducer,
    authReducer,
    userOrdersReducer,
    orderNumberReducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
