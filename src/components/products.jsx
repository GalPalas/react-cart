import React, { useState } from "react";
import { formatCurrency } from "../utils";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { getFilterdProducts } from "../store/products";
import { addToCart } from "../store/cart";

function Products() {
  const dispatch = useDispatch();
  const filterProducts = useSelector(getFilterdProducts());
  const [product, setProduct] = useState(null);

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  const addItemFromModal = (product) => {
    dispatch(addToCart({ product }));
    closeModal();
  };

  return !filterProducts ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {filterProducts.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>

                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => dispatch(addToCart({ product }))}
                    className="button primary"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title}></img>
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  available Sizes:{" "}
                  {product.availableSizes.map((size) => (
                    <span>
                      {" "}
                      <button className="button">{size}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addItemFromModal(product);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}

export default Products;
