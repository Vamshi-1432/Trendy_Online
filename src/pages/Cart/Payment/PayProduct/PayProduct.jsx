import React, { useEffect, useState } from "react";
import "../../../../styles/styleComponents/pages/Cart/Payment/PayProduct/payProduct.css";
import PaymentConfirm from "../PaymentConfirm/PaymentConfirm";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Items/Loading/Loading";
import { setEnableProceedPayment } from "../../../../redux/cartSlice/buyProductSlice";

const PayProduct = () => {
  const dispatch = useDispatch();
  const [paymentConfirm, setPaymentConfirm] = useState(false);

  const paymentAmount = useSelector((state) => state.buy.paymentDetails);

  useEffect(() => {
    if (paymentAmount) {
      const timer = setTimeout(() => {
        setPaymentConfirm(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [paymentAmount]);

  const handleCancel = () => {
    dispatch(setEnableProceedPayment());
  };

  return (
    <div className="payproduct-container">
      <div className="payproduct-header">
        <h2>Payment</h2>
        <ion-icon name="close-outline" onClick={handleCancel}></ion-icon>
      </div>
      <p>All transactions are secure and encrypted.</p>
      <hr />
      {paymentConfirm ? <PaymentConfirm cancel={handleCancel} /> : <Loading />}
    </div>
  );
};

export default PayProduct;
