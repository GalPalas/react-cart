import { useState, useEffect } from "react";
import { fetchProducts } from "./store/products";
import { useDispatch } from "react-redux";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/cart";
import data from "./data.json";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    dispatch(fetchProducts(data.products));
  }, [dispatch]);

  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  const removeFromCart = (product) => {
    const localCartItems = [...cartItems];
    setCartItems(localCartItems.filter((item) => item._id !== product._id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(localCartItems.filter((item) => item._id !== product._id))
    );
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
    localStorage.setItem("cartItems", JSON.stringify(localCartItems));
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/#">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All rights is reserved</footer>
    </div>
  );
}

export default App;
