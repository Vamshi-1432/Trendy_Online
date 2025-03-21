import React, { useState, useEffect } from "react";
import "../../../../styles/styleComponents/pages/Cart/Buy/Address/address.css";
import { setShippingDetails } from "../../../../redux/cartSlice/buyProductSlice";
import { useDispatch } from "react-redux";

const Address = ({ setEnablePay }) => {
  const dispatch = useDispatch();
  const [userEmail, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [firstnameMessage, setFirstnameMessage] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameMessage, setLastnameMessage] = useState("");
  const [address, setAddress] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countryMessage, setCountryMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeMessage, setPostcodeMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const validateFields = () => {
    let isValid = true;

    if (!userEmail || !isValidEmail.test(userEmail)) {
      setEmailMessage(userEmail ? "Email is invalid." : "Email is required.");
      isValid = false;
    } else {
      setEmailMessage("");
    }

    if (!firstname) {
      setFirstnameMessage("First name is required.");
      isValid = false;
    } else {
      setFirstnameMessage("");
    }

    if (!lastname) {
      setLastnameMessage("Last name is required.");
      isValid = false;
    } else {
      setLastnameMessage("");
    }

    if (!address) {
      setAddressMessage("Address is required.");
      isValid = false;
    } else {
      setAddressMessage("");
    }

    if (!country) {
      setCountryMessage("Country is required.");
      isValid = false;
    } else {
      setCountryMessage("");
    }

    if (!phoneNumber) {
      setPhoneMessage("Phone number is required.");
      isValid = false;
    } else {
      setPhoneMessage("");
    }

    if (!postcode) {
      setPostcodeMessage("Postcode is required.");
      isValid = false;
    } else {
      setPostcodeMessage("");
    }
    setEnablePay(isValid);
  };

  useEffect(() => {
    if (isTouched) {
      validateFields();
      const details = {
        userEmail,
        firstname,
        lastname,
        address,
        country,
        phoneNumber,
        postcode,
      };
      dispatch(setShippingDetails(details));
    }
  }, [
    userEmail,
    firstname,
    lastname,
    address,
    country,
    phoneNumber,
    postcode,
    isTouched,
  ]);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <form className="address-form-container">
      <label>Email</label>
      <input
        placeholder="Email"
        type="email"
        className="address-email-input"
        value={userEmail}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        required
      />
      <p className="address-form-error">{isTouched && emailMessage}</p>

      <div className="address-form-name-inputs">
        <div className="address-name-field">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            onBlur={handleBlur}
            required
          />
          <p className="address-form-error">{isTouched && firstnameMessage}</p>
        </div>
        <div className="address-name-field">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            onBlur={handleBlur}
            required
          />
          <p className="address-form-error">{isTouched && lastnameMessage}</p>
        </div>
      </div>

      <label>Street Address</label>
      <textarea
        className="address-form-textarea"
        placeholder="Mention Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handleBlur}
        required
      />
      <p className="address-form-error">{isTouched && addressMessage}</p>

      <div className="address-name-field">
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={handleBlur}
          required
        />
        <p className="address-form-error">{isTouched && countryMessage}</p>
      </div>

      <div className="address-form-name-inputs">
        <div className="address-name-field">
          <label>Postcode</label>
          <input
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onBlur={handleBlur}
            required
            maxLength={6}
          />
          <p className="address-form-error">{isTouched && postcodeMessage}</p>
        </div>
        <div className="address-name-field">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={handleBlur}
            required
            maxLength={10}
          />
          <p className="address-form-error">{isTouched && phoneMessage}</p>
        </div>
      </div>
    </form>
  );
};

export default Address;
