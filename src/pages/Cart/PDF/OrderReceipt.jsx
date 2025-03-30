import React from "react";
import { useSelector } from "react-redux";
import ExportToPDF from "./ExportToPDF";

const OrderReceipt = () => {
  const {
    userEmail,
    firstname,
    lastname,
    address,
    country,
    phoneNumber,
    postcode,
  } = useSelector((store) => store.buy.shippingDetails);
  const items = useSelector((store) => store.cart.items); 
  const { receiptId, total, deliveryCharges, grandTotal } = useSelector(
    (store) => store.buy.paymentDetails
  );

  const payMode = useSelector((state) => state.buy.paymentMode);

  const orderData = {
    items,
    userEmail,
    firstname,
    lastname,
    address,
    country,
    phoneNumber,
    postcode,
    receiptId,
    total: total,
    deliveryCharges: deliveryCharges,
    grandTotal: grandTotal,
    payMode,
  };

  return (
    <div>
      <ExportToPDF orderData={orderData} />
    </div>
  );
};

export default OrderReceipt;
