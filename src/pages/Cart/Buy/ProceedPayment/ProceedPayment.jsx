import React, { useState } from "react";
import {
  setEnableBuy,
  setEnableProceedPayment,
  setPaymentDetails,
} from "../../../../redux/cartSlice/buyProductSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/styleComponents/pages/Cart/Buy/ProceedPayment/proceedPayment.css";
import TermsAndConditions from "../../TermsAndConditions/TermsAndConditions/TermsAndConditions";
import { setShowCart } from "../../../../redux/cartSlice/cartSlice";

const ProceedPayment = (enablePay) => {
  const [showTerms, setShowTerms] = useState(false);
  const dispatch = useDispatch();

  const paymentAmount = useSelector((store) => store.buy.paymentDetails);
  console.log(paymentAmount);

  // Extract or calculate total, deliveryCharges, and grandTotal
  const total = paymentAmount.total || 0;
  const deliveryCharges =
    paymentAmount.deliveryCharges !== undefined
      ? paymentAmount.deliveryCharges
      : 0; // Default to 0 if not defined
  const grandTotal = paymentAmount.grandTotal || total + deliveryCharges;

  const handlePayAmount = () => {
    // Dispatch calculated values
    dispatch(setPaymentDetails({ total, deliveryCharges, grandTotal }));
    dispatch(setEnableBuy());
    dispatch(setEnableProceedPayment());
    dispatch(setShowCart(false));
  };

  return (
    <div
      className="payment-container"
      style={{ marginTop: showTerms ? "" : "50%" }}
    >
      <button
        disabled={!enablePay}
        onClick={handlePayAmount}
        className="payment-button"
      >
        <ion-icon name="lock-closed-outline" /> Pay Securely
      </button>
      <TermsAndConditions showTerms={showTerms} setShowTerms={setShowTerms} />
    </div>
  );
};

export default ProceedPayment;
