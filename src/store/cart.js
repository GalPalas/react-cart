import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems" || "[]")),
  },
  reducers: {
    addToCart: (cart, action) => {
      const { product } = action.payload;
      const localCartItems = [...cart.cartItems];

      let alreadyInCart = false;
      localCartItems.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        localCartItems.push({ ...product, count: 1 });
      }

      cart.cartItems = [...localCartItems];
      localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    },
    removeFromCart: (cart, action) => {
      const { product, cartItems } = action.payload;

      const localCartItems = [...cartItems];
      cart.cartItems = localCartItems.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItems = () =>
  createSelector(
    (state) => state.entities.cart.cartItems,
    (cartItems) => cartItems
  );
