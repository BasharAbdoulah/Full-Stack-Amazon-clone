export const initialState = {
    basket: [],
    newUsername: "",
    clickedProduct: {},
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: [],
            };
        case "REGISTER_ACTION":
            return {
                ...state,
                newUsername: action.userName,
            };
        case "PRODUCT_CLICK":
            return {
                ...state,
                clickedProduct: action.proprtys,
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketitem) => basketitem.id === action.id
            );

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket`
                );
            }

            return {
                ...state,
                basket: newBasket,
            };

        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;
