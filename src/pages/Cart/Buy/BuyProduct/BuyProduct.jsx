import React, { useState } from "react";
import ".././../../../styles/styleComponents/pages/Cart/Buy/BuyProduct/buyProduct.css";
import { useDispatch } from "react-redux";
import { setEnableBuy } from "../../../../redux/cartSlice/buyProductSlice";
import Address from "../Address/Address";
import ProceedPayment from "../ProceedPayment/ProceedPayment";

const BuyProduct = () => {
  const [enablePay, setEnablePay] = useState(false);
  const dispatch = useDispatch();
  // const paymentInfo = useSelector((state) => state.buy.paymentDetails);

  // useEffect(() => {
  //   dispatch(setPaymentDetails(paymentInfo));
  // }, []);

  const handleClosePopup = () => {
    dispatch(setEnableBuy());
  };

  return (
    <div className="buy-item-outer-container">
      <div className="buy-item-close">
        <h4 className="buy-item-title">Shipping Details</h4>
        <ion-icon name="close-outline" onClick={handleClosePopup} />
      </div>
      <hr />
      <div className="buy-item-summary-details">
        <div className="buy-item-address-details-container">
          <div className="buy-item-address-details">
            <Address setEnablePay={setEnablePay} />
          </div>
        </div>
        <div className="buy-item-payment-details">
          <ProceedPayment enablePay={enablePay} />
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
