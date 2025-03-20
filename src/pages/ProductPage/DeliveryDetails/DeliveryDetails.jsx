import React, { useEffect, useState } from "react";
import "./deliveryDetails.css";
import return_1 from "../../../images/return_1.png";
import return_2 from "../../../images/return_2.png";
import truck from "../../../images/truck.png";

const DeliveryDetails = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.body.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkTheme(document.body.getAttribute("data-theme") === "dark");
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="delivery-details-container">
      <div className="delivery-details-subcontainer1">
        <img src={truck} className="delivery-details-image" alt="Truck" />
        <div className="delivery-details-text">
          <h6 className="delivery-details-title">Free Delivery</h6>
          <h6 className="delivery-details-title_1">
            Enter your postal code for Delivery Availability
          </h6>
        </div>
      </div>
      <div className="delivery-details-subcontainer2">
        <img
          src={isDarkTheme ? return_2 : return_1}
          className="delivery-details-image"
          alt="Return"
        />
        <div className="delivery-details-text">
          <h6 className="delivery-details-title">Return Delivery</h6>
          <h6 className="delivery-details-title_1">
            Free 30 Days Delivery Returns.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
