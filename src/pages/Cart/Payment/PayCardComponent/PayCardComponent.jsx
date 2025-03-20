import React, { useState, useEffect } from "react";
import "../../../../styles/styleComponents/pages/Cart/Payment/PayCardComponent/payCardComponent.css";
import rupayCard from "../../../../images/Cart/Payment/rupay.png";
import masterCard from "../../../../images/Cart/Payment/masterCard.png";
import visaCard from "../../../../images/Cart/Payment/visa.png";

const PayCardComponent = (setPayButton) => {
  const [cardType, setCardType] = useState("");
  const [cardImage, setCardImage] = useState("");
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvvNumber, setCvvNumber] = useState("");

  useEffect(() => {
    // Update card image based on type
    if (cardType === "Visa") {
      setCardImage(visaCard);
    } else if (cardType === "MasterCard") {
      setCardImage(masterCard);
    } else if (cardType === "RuPay") {
      setCardImage(rupayCard);
    } else {
      setCardImage("");
    }
  }, [cardType]);

  const identifyCardType = (number) => {
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "MasterCard";
    if (/^(60|65|81|82)/.test(number)) return "RuPay";
    return "Unknown";
  };

  const formatCardNumber = (number) =>
    number
      .replace(/\s+/g, "") // Remove spaces
      .replace(/(\d{4})/g, "$1 ") // Add a space after every 4 digits
      .trim(); // Remove trailing spaces

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s+/g, "");
    setFormattedCardNumber(formatCardNumber(input));
    setCardType(identifyCardType(input));
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Only numbers
    const month = input.slice(0, 2);
    const year = input.slice(2, 4);
    const formattedExpiry = month + (year ? " / " + year : "");
    setExpiry(formattedExpiry);
  };

  const validateCardDetails = () => {
    // Basic validation
    const isCardNameValid = cardName.trim().length > 0;
    const isCardNumberValid =
      formattedCardNumber.replace(/\s+/g, "").length === 16;
    const isExpiryValid =
      expiry.length === 7 &&
      Number(expiry.slice(0, 2)) >= 1 &&
      Number(expiry.slice(0, 2)) <= 12; // Check MM/YY format
    const isCvvValid = cvvNumber.length === 3 && /^\d{3}$/.test(cvvNumber);

    return isCardNameValid && isCardNumberValid && isExpiryValid && isCvvValid;
  };

  useEffect(() => {
    setPayButton(validateCardDetails());
  }, [cardName, formattedCardNumber, expiry, cvvNumber]);

  return (
    <div className="pay-card-container">
      <div className="px-3 pt-0 pay-card-holder">
        <label htmlFor="card-holder" className="d-flex justify-content-between">
          <span className="labeltxt">Card Holder</span>
        </label>
        <input
          type="text"
          id="card-holder"
          className="form-control inputtxt input-card-holder"
          placeholder="Card Holder"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </div>
      <div className="px-3 pt-2">
        <label htmlFor="card-number" className="d-flex justify-content-between">
          <span className="labeltxt">Card Number</span>
          <img src={cardImage} width="25" className="image" alt="" />
        </label>
        <input
          type="text"
          id="card-number"
          className="form-control inputtxt"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          value={formattedCardNumber}
          onChange={handleCardNumberChange}
        />
      </div>
      <div className="d-flex justify-content-between px-3 pt-2">
        <div>
          <label htmlFor="expiry" className="exptxt">
            Expiry
          </label>
          <input
            type="text"
            id="expiry"
            className="form-control expiry"
            placeholder="MM / YY"
            maxLength={7}
            value={expiry}
            onChange={handleExpiryDateChange}
          />
        </div>
        <div>
          <label htmlFor="cvv" className="cvvtxt">
            CVV / CVC
          </label>
          <input
            type="password"
            id="cvv"
            className="form-control cvv"
            placeholder=""
            maxLength={3}
            value={cvvNumber}
            onChange={(e) => setCvvNumber(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PayCardComponent;
