import { useEffect } from "react";
import { fetchProducts } from "./store/products";
import { useDispatch } from "react-redux";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/cart";
import data from "./data.json";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(data.products));
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header>
        <a href="/#">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>All rights is reserved</footer>
    </div>
  );
}

export default App;
