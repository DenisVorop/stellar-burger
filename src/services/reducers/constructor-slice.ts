import { createSlice } from '@reduxjs/toolkit';

import { TIngredient, TOrder } from '../../utils/types';
import { orderBurger } from '../actions';

interface constructorState {
    bun: TIngredient | null;
    ingredients: TIngredient[];
    orderRequest: boolean;
    order: TOrder | null;
}
const initialState: constructorState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    order: null,
};

type movedIndex = {
    index: number;
    newIndex: number;
};

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: (create) => ({
        addIngredient: create.reducer<TIngredient>((state, action) => {
            const newIngredient = action.payload;

            if (newIngredient.type === 'bun') {
                state.bun = newIngredient;
            } else {
                state.ingredients.push(newIngredient);
            }
        }),
        removeIngredient: create.reducer<string>((state, action) => {
            state.ingredients = state.ingredients.filter((ingredient) => ingredient._id !== action.payload);
        }),
        moveIngredient: create.reducer<movedIndex>((state, action) => {
            const { index, newIndex } = action.payload;
            const movedIngredient = state.ingredients[index];
            state.ingredients.splice(index, 1);
            state.ingredients.splice(newIndex, 0, movedIngredient);
        }),
        clearConstructor: create.reducer((state) => {
            state.ingredients = [];
            state.bun = null;
        }),
        clearOrder: create.reducer((state) => {
            state.order = null;
        }),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(orderBurger.pending, (state) => {
                state.orderRequest = true;
            })
            .addCase(orderBurger.fulfilled, (state, action) => {
                state.orderRequest = false;
                state.order = action.payload.order;
            });
    },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor, clearOrder } =
    constructorSlice.actions;
export default constructorSlice.reducer;
