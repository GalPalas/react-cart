import React, { useState } from "react";
import Modal from "react-modal";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { formatCurrency, dateBuilder } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, removeFromCart } from "../store/cart";
import { create_order } from "../store/order";

function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems());

  const closeModal = () => {
    setOrder(null);
  };

  const handleInput = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
    let lastId = Math.random().toString(36).substr(2, 9);
    e.preventDefault();
    const order = {
      _id: lastId,
      name: name,
      email: email,
      address: address,
      cartItems: cartItems,
    };
    dispatch(create_order({ orderDetails: order }));
    setOrder(order);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} items in the cart{" "}
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} X {item.count}{" "}
                      <button
                        className="button"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              product: item,
                              cartItems: cartItems,
                            })
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className="button primary"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <div className="cart">
                <Fade right cascade>
                  <form onSubmit={handleSubmit}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </Fade>
                {order && (
                  <Modal
                    isOpen={true}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                  >
                    <Zoom>
                      <button className="close-modal" onClick={closeModal}>
                        X
                      </button>
                      <div className="order-details">
                        <h3 className="success-message">
                          Your order has been placed.
                        </h3>
                        <h2>Order {order._id}</h2>
                        <ul>
                          <li>
                            <div>Name:</div>
                            <div>{order.name}</div>
                          </li>
                          <li>
                            <div>Email:</div>
                            <div>{order.email}</div>
                          </li>
                          <li>
                            <div>Address:</div>
                            <div>{order.address}</div>
                          </li>
                          <li>
                            <div>Date:</div>
                            <div>{dateBuilder(new Date())}</div>
                          </li>
                          <li>
                            <div>Total:</div>
                            {formatCurrency(
                              order.cartItems.reduce(
                                (a, c) => a + c.price * c.count,
                                0
                              )
                            )}
                          </li>
                          <li>
                            <div>Cart Items:</div>
                            <div>
                              {order.cartItems.map((x) => (
                                <div>
                                  {x.count} {" x "} {x.title}
                                </div>
                              ))}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Zoom>
                  </Modal>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
