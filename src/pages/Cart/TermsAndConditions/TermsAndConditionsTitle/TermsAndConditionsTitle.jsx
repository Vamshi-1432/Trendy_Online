import React, { useState } from "react";
import "../../../../styles/styleComponents/pages/Cart/TermsAndConditions/TermsAndConditionsTitle/termsAndConditionsTitle.css";
import data from "../../../../data/termsAndConditions.json";
import TermsAndConditionsDetails from "../TermsAndConditionsDetails/TermsAndConditionsDetails";

const TermsAndConditionsTitle = () => {
  const [showDetails, setShowDetails] = useState(null);
  const handleDisplayDetails = (id) => {
    setShowDetails((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="term-details-container">
      {data.map((term) => (
        <div className="term-details-label-container" key={term.id}>
          <div
            className="term-details-sub-container"
            onClick={() => handleDisplayDetails(term.id)}
          >
            <label>{term.title}</label>
            <div className="term-details-icon">
              <ion-icon
                name={
                  showDetails === term.id
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
              />
            </div>
          </div>
          {showDetails === term.id && (
            <TermsAndConditionsDetails details={term} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditionsTitle;
