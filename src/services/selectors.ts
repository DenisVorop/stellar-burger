import { RootState } from './store';

export const getErrorMessage = (state: RootState) => state.authReducer.error;
export const getUser = (state: RootState) => state.authReducer.user;
export const getUserName = (state: RootState) => state.authReducer.user?.name;
export const getUserRequest = (state: RootState) => state.authReducer.userRequest;
export const getIsAuthChecked = (state: RootState) => state.authReducer.isAuthChecked;
export const getIsAuth = (state: RootState) => state.authReducer.isAuth;

export const getOrderRequest = (state: RootState) => state.constructorReducer.orderRequest;
export const getOrderData = (state: RootState) => state.constructorReducer.order;
export const getConstructorIngredients = (state: RootState) => state.constructorReducer.ingredients;
export const getConstructorBun = (state: RootState) => state.constructorReducer.bun;

export const getIngredients = (state: RootState) => state.ingredientsReducer.ingredients;

export const getSelectedOrders = (state: RootState) => state.orderNumberReducer.selectedOrders;

export const getUserOrders = (state: RootState) => state.userOrdersReducer.orders;
