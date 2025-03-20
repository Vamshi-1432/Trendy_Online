import React from "react";
import "../../../styles/styleComponents/pages/Cart/CartItems/cartItems.css";
import cart from "../../../images/Cart/CartItems/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../../../redux/cartSlice/cartSlice";

const CartItems = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(setShowCart());
  };
  return (
    <div className="cart-container" onClick={handleCart}>
      <img src={cart} alt="cart" className="cart-image" />
      <p className="cart-items-count">{cartItems.length}</p>
    </div>
  );
};

export default CartItems;
