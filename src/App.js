import { useState, useEffect } from "react";
import data from "./data.json";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setProducts(data.products);
  }, []);

  const removeFromCart = (product) => {
    const localCartItems = [...cartItems];
    setCartItems(localCartItems.filter((item) => item._id !== product._id));
  };

  const addToCart = (product) => {
    const localCartItems = [...cartItems];
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
    setCartItems(localCartItems);
  };

  const filterProducts = (event) => {
    if (event.target.value === "") {
      setProducts(data.products);
      setSize(event.target.value);
    } else {
      const filter = products.filter(
        (product) => product.availableSizes.indexOf(event.target.value) >= 0
      );
      setProducts(filter);
      setSize(event.target.value);
    }
  };

  const sortProducts = (event) => {
    const sort = event.target.value;

    const sortBy = products
      .slice()
      .sort((a, b) =>
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1
      );
    setSort(sort);
    setProducts(sortBy);
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/#">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          </div>
        </div>
      </main>
      <footer>All rights is reserved</footer>
    </div>
  );
}

export default App;
