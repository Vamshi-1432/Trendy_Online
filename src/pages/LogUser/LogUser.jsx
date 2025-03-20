import React from "react";
import loginDayImage from "../../images/loginDayImage.png";
import "../../styles/styleComponents/pages/LogUser/logUser.css";
import { SignInForm } from "../SignIn/SignInForm";
import SignUpForm from "../SignUp/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { setEnableLogin } from "../../redux/loginSlice";

const LogUser = () => {
  const enableLogin = useSelector((state) => state.login.enableLogin);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(setEnableLogin());
  };

  return (
    <>
      <div className="login-container">
        <div className="login-image-container">
          <img src={loginDayImage} alt="bgImg" className="login-image" />
        </div>
        <div className="login-form-container">
          {enableLogin ? <SignUpForm /> : <SignInForm />}

          <h4 className="login-signup-header">
            {enableLogin ? "Already Registered?" : "New User?"}
            {"  "}
            <a
              href="#login"
              className="login-signup-create"
              onClick={handleLogin}
            >
              {enableLogin ? "Login" : "Create an account"}
            </a>
          </h4>
        </div>
      </div>
    </>
  );
};

export default LogUser;
