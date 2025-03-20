import React from "react";
import "../../../styles/styleComponents/Items/electronic/electronics/electronics.css";
import Mobile from "./mobiles/Mobile";
import Tablets from "./tablets/Tablets.jsx";
import Laptops from "./laptops/Laptops.jsx";
import Cameras from "./cameras/Cameras.jsx";

const Electronics = () => {
  return (
    <div className="electronics-outer-container">
      <h4 className="electronics-heading-containerh4">Electronics</h4>
      <hr className="electronics-heading-containerhr" />
      <Mobile />
      <Tablets />
      <Laptops />
      <Cameras />
    </div>
  );
};

export default Electronics;
