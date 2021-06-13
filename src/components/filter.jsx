import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterdProducts, filterProductsBySize } from "../store/products";

function Filter({ sort, sortProducts }) {
  const filterProducts = useSelector(getFilterdProducts());
  const dispatch = useDispatch();

  return !filterProducts ? (
    <div>Loading... </div>
  ) : (
    <div className="filter">
      <div className="filter-result">{filterProducts.length} Products</div>
      <div className="filter-sort">
        Order{" "}
        <select value={sort} onChange={sortProducts}>
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select
          onChange={(e) =>
            dispatch(
              filterProductsBySize({
                size: e.target.value,
                data: filterProducts,
              })
            )
          }
        >
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
