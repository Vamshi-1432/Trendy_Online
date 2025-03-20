import React from "react";
import "../../../../styles/styleComponents/pages/Cart/TermsAndConditions/TermsAndConditions/termsAndConditions.css";
import TermsAndConditionsTitle from "../TermsAndConditionsTitle/TermsAndConditionsTitle";

const TermsAndConditions = (showTerms, setShowTerms) => {
  const handleShowTerms = () => {
    setShowTerms(() => !showTerms);
  };
  return (
    <div className="terms-container">
      <label className="terms-container-label" onClick={handleShowTerms}>
        Terms and Conditions
      </label>
      {showTerms && <TermsAndConditionsTitle />}
    </div>
  );
};

export default TermsAndConditions;
