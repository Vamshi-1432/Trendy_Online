import React from "react";
import "../../../../styles/styleComponents/pages/Cart/TermsAndConditions/TermsAndConditionsDetails/termsAndConditionsDetails.css";

const TermsAndConditionsDetails = (details) => {
  const { description1, description2, descriptionSub } = details;

  return (
    <ul>
      {description1 && <li>{description1}</li>}

      {Array.isArray(descriptionSub) &&
        descriptionSub.map((desc, index) => (
          <ul key={index}>
            {desc.descSub1 && (
              <li className="list-items-descSub">{desc.descSub1}</li>
            )}
            {desc.descSub2 && (
              <li className="list-items-descSub">{desc.descSub2}</li>
            )}
          </ul>
        ))}

      {Array.isArray(description2)
        ? description2.map((desc, index) => (
            <li key={index}>
              {desc.type && <strong>{desc.type}: </strong>}
              {desc.details}
            </li>
          ))
        : description2 && <li>{description2}</li>}
    </ul>
  );
};

export default TermsAndConditionsDetails;
