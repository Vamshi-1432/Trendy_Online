import React, { useState } from "react";
import "../../../../styles/styleComponents/pages/Cart/Payment/PaymentConfirm/paymentConfirm.css";
import ruPay from "../../../../images/Cart/Payment/rupay.png";
import visa from "../../../../images/Cart/Payment/visa.png";
import masterCard from "../../../../images/Cart/Payment/masterCard.png";
import PayCardComponent from "../PayCardComponent/PayCardComponent";
import paymentDoneImg from "../../../../images/Cart/Payment/PaymentDone.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentDetails,
  setPaymentMode,
} from "../../../../redux/cartSlice/buyProductSlice";
import emailjs from "@emailjs/browser";

const PaymentConfirm = (cancel) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [receiptId, setReceiptId] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isCardValid, setIsCardValid] = useState(false);
  const dispatch = useDispatch();

  // Extract grandTotal and paymentMode from Redux state
  const paymentAmount = useSelector((store) => store.buy.paymentDetails);
  const { total, deliveryCharges, grandTotal } = paymentAmount;

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Update pay mode based on selection
    if (selectedValue === "COD") {
      setIsCardValid(true); // Enable button for COD
      dispatch(setPaymentMode("Cash on Delivery"));
    } else if (selectedValue === "Card") {
      setIsCardValid(false); // Card validation required
      dispatch(setPaymentMode("Card"));
    }
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value || 0); // Default to 0 if value is undefined
  };

  const generateReceiptId = () => {
    return `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const { userEmail, firstname } = useSelector(
    (store) => store.buy.shippingDetails
  );

  // const items = useSelector((store) => store.cart.items);
  const payMode = useSelector((state) => state.buy.paymentMode);
  // const emailConfirmation = {
  //   to_name: firstname,
  //   userEmail: userEmail,
  //   receiptId: receiptId,
  //   grandTotal: formatCurrency(grandTotal),
  //   message: "Order is placed successfully!!!",
  // };

  const handlePaymentDone = (e) => {
    e.preventDefault();
    const newReceiptId = generateReceiptId();
    setReceiptId(newReceiptId);

    // Send email via EmailJS with items data
    emailjs
      .send(
        "service_djuhfqp",
        "template_jtuexih",
        {
          to_name: firstname,
          userEmail: userEmail,
          total: formatCurrency(total),
          deliveryCharges:
            deliveryCharges === 0 ? "Free" : formatCurrency(deliveryCharges),
          receiptId: newReceiptId,
          payMode: payMode,
          grandTotal: formatCurrency(grandTotal),
          message: "Order is placed successfully!!!",
        },
        "qaJbKYzo1PlOwFY0u"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    dispatch(
      setPaymentDetails({
        total,
        deliveryCharges,
        grandTotal,
        receiptId: newReceiptId,
      })
    );

    setShowContent(false);
    setPaymentDone(true);

    setTimeout(() => {
      setPaymentDone(false);
      setShowContent(true);
      cancel();
    }, 3000);
  };

  return (
    <div className="payment-confirm-container">
      {showContent && (
        <>
          {/* Card Payment Option */}
          <div
            className={`payment-option ${
              selectedOption === "Card" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentOption"
              value="Card"
              checked={selectedOption === "Card"}
              onChange={handleOptionChange}
            />
            <span>
              Cards
              <div className="icons">
                <img src={ruPay} alt="RuPay" />
                <img src={visa} alt="Visa" />
                <img src={masterCard} alt="MasterCard" />
              </div>
            </span>
          </div>

          {/* Cash on Delivery (COD) Option */}
          <div
            className={`payment-option ${
              selectedOption === "COD" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentOption"
              value="COD"
              checked={selectedOption === "COD"}
              onChange={handleOptionChange}
            />
            <span>Cash on Delivery (COD)</span>
          </div>

          {/* Pay Amount Section */}
          <div className="pay-amount-container">
            <div className="pay-amount-header">
              <p className="pay-amount-title">Pay Amount</p>
              <p className="pay-amount-amount">{formatCurrency(grandTotal)}</p>
            </div>

            {/* Show PayCardComponent if "Card" is selected */}
            {selectedOption === "Card" && (
              <PayCardComponent setPayButton={setIsCardValid} />
            )}

            {/* Buttons for Payment */}
            <div className="pay-amount-button-container">
              <button className="pay-amount-cancel-button" onClick={cancel}>
                Cancel
              </button>
              <button
                disabled={!isCardValid} // Button enabled only if validation is successful
                className="pay-amount-button"
                onClick={handlePaymentDone}
              >
                Make Payment
              </button>
            </div>
          </div>
        </>
      )}

      {/* Payment Success Message */}
      {paymentDone && (
        <div className="payment-done-container">
          <img src={paymentDoneImg} alt="Payment Done" />
          <p>Payment Done...!!</p>
          <p>Order ID: {receiptId}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirm;
