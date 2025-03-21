import React, { useState } from "react";
import {
  setEnableBuy,
  setEnableProceedPayment,
  setPaymentDetails,
} from "../../../../redux/cartSlice/buyProductSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/styleComponents/pages/Cart/Buy/ProceedPayment/proceedPayment.css";
import TermsAndConditions from "../../TermsAndConditions/TermsAndConditions/TermsAndConditions";
 

const ProceedPayment = ({ enablePay }) => {
  const [showTerms, setShowTerms] = useState(false);
  const dispatch = useDispatch();

  const paymentAmount = useSelector((store) => store.buy.paymentDetails);
  console.log(paymentAmount);

  // Extract or calculate total, deliveryCharges, and grandTotal
  const total = paymentAmount.total || 0;
  const deliveryCharges =
    paymentAmount.deliveryCharges !== undefined
      ? paymentAmount.deliveryCharges
      : 0;
  const grandTotal = paymentAmount.grandTotal || total + deliveryCharges;

  const handlePayAmount = () => {
    dispatch(setPaymentDetails({ total, deliveryCharges, grandTotal }));
    dispatch(setEnableBuy());
    dispatch(setEnableProceedPayment());
  };

  return (
    <div
      className={showTerms ? "payment-container-terms" : "payment-container"}
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
