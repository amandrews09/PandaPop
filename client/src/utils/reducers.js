/* eslint-disable no-case-declarations */
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      const cartItem = {
        ...(state.cart.find(
          ({ product }) => product && product._id === action.product._id
        ) ?? { product: action.product, quantity: 0 }),
      };
      cartItem.quantity += 1;
      return {
        ...state,
        cartOpen: true,
        cart: [
          ...state.cart.filter(
            ({ product }) => product && product._id !== action.product._id
          ),
          cartItem,
        ],
      };

    case ADD_MULTIPLE_TO_CART:
      const productIds = action.products.map(({ _id }) => _id);
      const updatedCartItems = state.cart
        .filter(({ product }) => product && productIds.includes(product._id))
        .map(({ product, quantity }) => ({ product, quantity: quantity + 1 }));
      const newCartItems = action.products
        .filter(
          ({ _id }) =>
            !updatedCartItems.some(({ product }) => product && product._id === _id)
        )
        .map((product) => ({ product, quantity: 1 }));
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            ({ product }) => product && !productIds.includes(product._id)
          ),
          ...updatedCartItems,
          ...newCartItems,
        ],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((cartItem) => {
          if (cartItem.product && action._id === cartItem.product._id) {
            cartItem.quantity = action.purchaseQuantity;
          }
          return cartItem;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((cartItem) => {
        return cartItem.product && cartItem.product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
};
