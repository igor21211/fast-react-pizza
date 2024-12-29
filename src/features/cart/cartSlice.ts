import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "./types";


interface CartState {
  cart: ICartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      if (state.cart.find((item) => item.pizzaId === action.payload.pizzaId)) {
        state.cart.find((item) => item.pizzaId === action.payload.pizzaId)!.quantity++;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        } else {
          item.quantity--;
          item.totalPrice = item.unitPrice * item.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
