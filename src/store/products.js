import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filterItems: [],
    size: "",
  },
  reducers: {
    fetchProducts: (products, action) => {
      for (let product of action.payload) products.items.push(product);
      products.filterItems = [...products.items];
    },
    filterProductsBySize: (products, action) => {
      const { size, data } = action.payload;
      products.filterItems = [...data];

      if (size === "") {
        products.filterItems = [...data];
      } else {
        const filter = products.filterItems.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        );
        products.filterItems = [...filter];
        products.size = size;
      }
    },
  },
});

export const { fetchProducts, filterProductsBySize } = slice.actions;
export default slice.reducer;

export const getProducts = () =>
  createSelector(
    (state) => state.entities.products.items,
    (items) => items
  );

export const getFilterdProducts = () =>
  createSelector(
    (state) => state.entities.products.filterItems,
    (filterItems) => filterItems
  );
