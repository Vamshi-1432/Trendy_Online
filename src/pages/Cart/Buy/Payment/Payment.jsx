// import React, { useState } from "react";
// import "./payment.css";
// import { useDispatch, useSelector } from "react-redux";
// import Coupons from "./Coupons";
// import {
//   setEnableBuy,
//   setEnableProceedPayment,
//   setPaymentDetails,
// } from "../../../redux/cartSlice/buyProductSlice";

// const Payment = ({ enablePay }) => {
//   const dispatch = useDispatch();
//   const paymentDetails = useSelector((amount) => amount.buy.paymentDetails);

//   const [payValue, setPayValue] = useState(paymentDetails.grandTotal);
//   const deliveryCharges = paymentDetails.total > 500 ? "Free" : 60;

//   console.log(paymentDetails);

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(value);
//   };

//   const handlePayAmount = () => {
//     dispatch(setPaymentDetails(payValue));
//     dispatch(setEnableBuy());
//     dispatch(setEnableProceedPayment());
//   };
//   return (
//     <div className="payment-main-container">
//       <div className="payment-row">
//         <span className="payment-label">Total Charges</span>
//         <span className="payment-value">
//           {formatCurrency(paymentDetails.total)}
//         </span>
//       </div>
//       <div className="payment-row payment-delivery-charges">
//         <span className="payment-label">Delivery Charges</span>
//         <span className="payment-value">{deliveryCharges}</span>
//       </div>
//       <div className="payment-row payment-grand-total">
//         <span className="payment-label">Total</span>
//         <span className="payment-value">
//           {formatCurrency(paymentDetails.grandTotal)}
//         </span>
//       </div>
//       <div className="payment-coupon-container">
//         <Coupons
//           grandValue={paymentDetails.grandTotal}
//           payValue={setPayValue}
//         />
//       </div>
//       <button
//         className="payment-pay-button"
//         disabled={!enablePay}
//         onClick={handlePayAmount}
//       >
//         Proceed{" "}
//         {formatCurrency(payValue ? payValue : paymentDetails.grandTotal)}{" "}
//         <span className="payment-pay-arrow">
//           <ion-icon name="arrow-forward-outline" />
//         </span>
//       </button>
//     </div>
//   );
// };

// export default Payment;
