import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    create_order: (order, action) => {
      const { orderDetails } = action.payload;
      order.push({ orderDetails });
    },
  },
});

export const { create_order } = orderSlice.actions;
export default orderSlice.reducer;
