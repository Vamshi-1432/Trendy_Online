import React from "react";
import ErrorBoundaryImage from "../../images/ErrorBoundary.jpg";
import "../../styles/styleComponents/ErrorBoundary/errorBoundary.css";
import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <div className="error-container">
      <img src={ErrorBoundaryImage} alt="Error" className="error-image" />
      <div className="error-text">
        <h2>
          <Link to="/" className="go-back-link">
            GO BACK HOME
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ErrorBoundary;
