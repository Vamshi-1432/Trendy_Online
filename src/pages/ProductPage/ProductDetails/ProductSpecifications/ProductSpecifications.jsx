import React from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const ProductSpecifications = ({ type, specifications = {} }) => {
  return (
    <div>
      <ul>
        {type === "mobiles" && (
          <>
            <li>Ram: {specifications?.ram}</li>
            <li>Storage: {specifications?.storage}</li>
            <li>Display: {specifications?.display}</li>
            <li>Camera: {specifications?.camera}</li>
            <li>Battery: {specifications?.battery}</li>
            <li>Processor: {specifications?.processor}</li>
            <li>OS: {specifications?.OS}</li>
          </>
        )}

        {type === "tablets" && (
          <>
            <li>Ram: {specifications?.ram}</li>
            <li>Storage: {specifications?.storage}</li>
            <li>Display: {specifications?.display}</li>
            <li>Camera: {specifications?.camera}</li>
            <li>Battery: {specifications?.battery}</li>
            <li>Cellular: {specifications?.cellularOption}</li>
            <li>Processor: {specifications?.processor}</li>
            <li>OS: {specifications?.OS}</li>
            <li>Pencil Compatibility: {specifications?.pencilCompatibility}</li>
            <li>USB Type: {specifications?.usbType}</li>
          </>
        )}

        {type === "laptops" && (
          <>
            <li>Ram: {specifications?.ram}</li>
            <li>Storage: {specifications?.storage}</li>
            <li>Display: {specifications?.display}</li>
            <li>Battery: {specifications?.battery}</li>
            <li>Processor: {specifications?.processor}</li>
            <li>OS: {specifications?.OS}</li>
          </>
        )}

        {type === "cameras" && (
          <>
            <li>Type: {specifications?.type}</li>
            <li>Sensor: {specifications?.sensor}</li>
            <li>Effective Pixels: {specifications?.effectivePixels}</li>
            <li>ISO Sensitivity: {specifications?.isoSensitivity}</li>
            <li>Auto Focus: {specifications?.autofocus}</li>
            <li>Viewfinder: {specifications?.viewfinder}</li>
            <li>Monitor: {specifications?.monitor}</li>
            <li>Connectivity: {specifications?.connectivity}</li>
          </>
        )}
      </ul>
    </div>
  );
};

ProductSpecifications.propTypes = {
  type: PropTypes.string.isRequired,
  specifications: PropTypes.object,
};

export default ProductSpecifications;
