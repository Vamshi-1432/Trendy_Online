import React from "react";
import "../../styles/styleComponents/Footer/footer.css";
import FooterItems from "./FooterItems/FooterItems";

const Footer = () => {
  return (
    <div className="footer-main-container">
      <FooterItems />
      <p>
        © {new Date().getFullYear()} Trendy Online Store. All rights reserved.
      </p>
      <p className="footer-developer">
        Developed with 💖 by{" "}
        <a
          href="https://www.linkedin.com/in/vamshi-samala-8a0845201/"
          target="_blank"
          rel="noreferrer"
        >
          <strong>Vamshi Samala</strong>
        </a>
      </p>
    </div>
  );
};

export default Footer;
