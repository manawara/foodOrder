import { createContext, useReducer } from "react";
const ADD_MEAL = "ADD_MEAL";
const REMOVE_MEAL = "REMOVE_MEAL";
const CLEAR_MEAL = "CLEAR_MEAL";

export const CartContext = createContext({
    items: [],
    addMeal: (item) => {},
});

function cartReducer(state, action) {
    switch (action.type) {
        case ADD_MEAL: {
            const findIndex = state.items.findIndex((item) => item.id === action.item.id);
            const updatesItem = [...state.items];
            if (findIndex > -1) {
                let findedItem = updatesItem[findIndex];
                const item = {
                    ...findedItem,
                    quantity: findedItem.quantity + 1,
                };
                updatesItem[findIndex] = item;
            } else {
                updatesItem.push({ ...action.item, quantity: 1 });
            }
            return {
                ...state,
                items: updatesItem,
            };
        }
        case REMOVE_MEAL: {
            const findIndex = state.items.findIndex((item) => item.id === action.id);
            const updatesItem = [...state.items];
            const item = updatesItem[findIndex];
            console.log(item);
            if (item.quantity === 1) {
                updatesItem.splice(findIndex, 1);
            } else {
                const obj = {
                    ...item,
                    quantity: item.quantity - 1,
                };
                updatesItem[findIndex] = obj;
            }

            return {
                ...state,
                items: updatesItem,
            };
        }
        case CLEAR_MEAL: {
            return {
                ...state,
                items: [],
            };
        }

        default:
            throw new Error("Item not add! Please try later!");
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    const addMeal = (item) => {
        console.log(item);
        dispatch({ type: ADD_MEAL, item });
    };
    const removeMeal = (id) => {
        dispatch({ type: REMOVE_MEAL, id });
    };
    const clearMeal = () => {
        dispatch({ type: CLEAR_MEAL });
    };
    const cartContext = {
        items: cart.items,
        addMeal,
        removeMeal,
        clearMeal,
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}
