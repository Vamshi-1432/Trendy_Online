import React, { useEffect, useState } from "react";
import "../../../styles/styleComponents/pages/Cart/CartPayValue/cartPayValue.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnableBuy,
  setPaymentDetails,
} from "../../../redux/cartSlice/buyProductSlice";
import coupons from "../../../data/coupons.json";

const CartPayValue = () => {
  const items = useSelector((store) => store.cart.items);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);

  const dispatch = useDispatch();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const total = calculateTotal();
  const deliveryCharges = total > 500 ? 0 : 60;

  useEffect(() => {
    const discount = selectedCoupon ? selectedCoupon.value : 0;
    setGrandTotal(total + deliveryCharges - discount);
  }, [total, deliveryCharges, selectedCoupon]);

  const handleProceedBuy = () => {
    const buyItems = {
      total,
      deliveryCharges,
      grandTotal,
    };
    dispatch(setEnableBuy());
    dispatch(setPaymentDetails(buyItems));
  };

  const handleCouponSelect = (coupon) => {
    if (total >= coupon.minValue) {
      setSelectedCoupon(coupon);
    }
  };

  return (
    <div className="cart-pay-container">
      <h5>Order Summary</h5>
      <hr />
      <div className="cart-pay-row">
        <label>Item Subtotal</label>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="cart-pay-row">
        <label>Coupons</label>
        <div className="custom-dropdown">
          <div className="selected-coupon">
            {selectedCoupon ? selectedCoupon.code : "-- Select Coupon --"}
          </div>
          <div className="dropdown-options">
            {coupons.map((coupon) => (
              <div
                key={coupon.couponId}
                className={`dropdown-option ${
                  total < coupon.minValue ? "disabled" : ""
                }`}
                onClick={() => handleCouponSelect(coupon)}
              >
                <p className="coupon-code">{coupon.code}</p>
                <p className="coupon-description">{coupon.description}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cart-pay-row">
        <label>Delivery Charges</label>
        <div className="delivery-charge-container">
          <span
            style={{
              color: deliveryCharges === 0 ? "green" : "red",
            }}
          >
            {deliveryCharges === 0 ? "Free" : formatCurrency(deliveryCharges)}
          </span>
          {deliveryCharges !== 0 && (
            <span
              style={{
                color: "green",
                textDecoration: "line-through",
                marginLeft: "8px",
              }}
            >
              Free
            </span>
          )}
        </div>
      </div>
      <div className="cart-pay-row">
        <label>Total Price</label>
        <span className="cart-pay-total">{formatCurrency(grandTotal)}</span>
      </div>
      <button className="cart-pay-buy-now" onClick={handleProceedBuy}>
        Buy Now
      </button>
    </div>
  );
};

export default CartPayValue;
