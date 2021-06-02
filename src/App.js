import { useState, useEffect } from "react";
import data from "./data.json";
import "./App.css";
import Products from "./components/products";

function App() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setProducts(data.products);
  }, []);

  return (
    <div className="grid-container">
      <header>
        <a href="/#">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products} />
          </div>
          <div className="sidebar">cart items</div>
        </div>
      </main>
      <footer>All rights is reserved</footer>
    </div>
  );
}

export default App;
