import React, { useState, useEffect } from "react";
import "../../styles/styleComponents//pages/SignIn/signInForm.css";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useDispatch, useSelector } from "react-redux";
import { setValidLoginUser } from "../../redux/loginSlice";
import { useNavigate } from "react-router";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [validUser, setValidUser] = useState(false);
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValidPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalValidUser = useSelector((state) => state.login.validLoginUser);

  useEffect(() => {
    if (globalValidUser) {
      navigate("/");
    }
  }, [globalValidUser, navigate]);

  const handleLoginEmail = () => {
    if (isValidEmail.test(userEmail)) {
      setEmailMessage("");
    } else {
      if (userEmail.length > 0) {
        setEmailMessage("Email is invalid.");
      } else {
        setEmailMessage("Email cannot be empty.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (userEmail && isValidEmail.test(userEmail)) {
      setEmailMessage("");
    }
  };

  const handleLoginPassword = () => {
    if (!isValidPassword.test(loginPassword)) {
      if (loginPassword.length > 0) {
        setLoginMessage("Entered password is invalid.");
      } else {
        setLoginMessage("Password cannot be empty.");
      }
    } else {
      setLoginMessage("");
    }
  };

  const handleLoginChange = (e) => {
    setLoginPassword(e.target.value);
    if (loginPassword && isValidPassword.test(loginPassword)) {
      setLoginMessage("");
    }
  };

  const handleLoginUserSubmit = (e) => {
    e.preventDefault();
    handleLoginPassword();
    handleLoginEmail();

    const storedUserString = localStorage.getItem("user");
    let storedUser;

    try {
      storedUser = storedUserString ? JSON.parse(storedUserString) : []; // Parse stored data
    } catch (error) {
      console.error("Error parsing stored user:", error);
      setStatusMessage("An error occurred. Please try again.");
      setValidUser(false);
      return;
    }

    if (!Array.isArray(storedUser)) {
      console.error("Stored user data is not in array format.");
      setStatusMessage("Data is corrupted. Please reset.");
      setValidUser(false);
      return;
    }

    const isEmailExists = storedUser.some((data) => data.email === userEmail);

    if (isEmailExists) {
      const userData = storedUser.find((data) => data.email === userEmail);

      if (userData.password === loginPassword) {
        setStatusMessage("Successfully Logged In!");
        setValidUser(true);
        dispatch(setValidLoginUser(true));

        localStorage.setItem("loggedIn", "true");
        navigate("/");
      } else {
        setStatusMessage("Invalid password.");
        setValidUser(false);
      }
    } else {
      setStatusMessage("Email doesn't exist.");
      setValidUser(false);
    }

    console.log("Email exists:", isEmailExists);
  };

  return (
    <form className="login-form-container">
      <h2 className="login-header">Sign In</h2>
      <label className="login-label-user">Enter Email</label>
      <input
        className="login-input-user"
        placeholder="Enter Email"
        type="email"
        value={userEmail}
        onChange={handleEmailChange}
      />
      {emailMessage && <p className="login-error-message">{emailMessage}</p>}
      <label className="login-label-password">Enter Password</label>
      <div className="login-pwd-sh-input">
        <input
          className="login-input-password"
          placeholder="Enter Password"
          type={showPassword ? "text" : "password"}
          value={loginPassword}
          onChange={handleLoginChange}
        />
        <span
          className="login-pwd-sh-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon icon={showPassword ? eyeOff : eye} />
        </span>
      </div>
      {loginMessage && <p className="login-error-message">{loginMessage}</p>}
      <button className="login-submit-button" onClick={handleLoginUserSubmit}>
        Login
      </button>
      {statusMessage && (
        <p
          className="login-error-message"
          style={{
            color: validUser ? "rgb(35, 210, 134)" : "rgb(210, 35, 35)",
          }}
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
};
