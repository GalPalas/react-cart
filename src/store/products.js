import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filterItems: [],
    size: "",
    sort: "",
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
    filterProductsByPrice: (products, action) => {
      const { sort } = action.payload;

      if (sort === "latest") {
        products.filterItems.sort((a, b) => (a._id > b._id ? 1 : -1));
      } else {
        products.filterItems.sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? -1
            : 1
        );
      }
      products.sort = sort;
    },
  },
});

export const { fetchProducts, filterProductsBySize, filterProductsByPrice } =
  slice.actions;
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
