import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

import { TIngredient, TOrder } from '../../utils/types';
import { orderBurger } from '../actions';

export interface ConstructorState {
    bun: TIngredient | null;
    ingredients: (TIngredient & { id: string })[];
    orderRequest: boolean;
    order: TOrder | null;
}
const initialState: ConstructorState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    order: null,
};

type MovedIndex = {
    index: number;
    newIndex: number;
};

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: (create) => ({
        addIngredient: create.preparedReducer(
            (payload: TIngredient) => {
                const id = nanoid();
                return { payload: { id, ...payload } };
            },
            (state, action: PayloadAction<TIngredient & { id: string }>) => {
                const newIngredient = action.payload;

                if (newIngredient.type === 'bun') {
                    state.bun = newIngredient;
                } else {
                    state.ingredients.push(newIngredient);
                }
            },
        ),
        removeIngredient: create.reducer<string>((state, action) => {
            state.ingredients = state.ingredients.filter((ingredient) => ingredient._id !== action.payload);
        }),
        moveIngredient: create.reducer<MovedIndex>((state, action) => {
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
