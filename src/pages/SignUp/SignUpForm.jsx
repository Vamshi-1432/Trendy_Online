import React, { useState } from "react";
import "../../styles/styleComponents/pages/SignUp/signUpForm.css";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useDispatch } from "react-redux";
import { setEnableLogin } from "../../redux/loginSlice";

const SignUpForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const dispatch = useDispatch();

  const handleLoginPage = () => {
    dispatch(setEnableLogin());
  };

  const handleFullname = (e) => {
    setFullname(e.target.value);
    const isValid = e.target.value;
    setFullnameError(isValid.length > 0 ? "" : "Full Name should not be empty");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = emailRegex.test(e.target.value);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = passwordRegex.test(e.target.value);
    setPasswordError(isValid ? "" : "Please enter a valid password.");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(
      password === e.target.value ? "" : "Passwords do not match."
    );
  };

  const handleShowCreatePassword = () => {
    setShowCreatePassword(!showCreatePassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !email || !password || !confirmPassword) {
      setFullnameError(!fullname ? "Fullname is required" : fullnameError);
      setEmailError(!email ? "Email is required" : emailError);
      setPasswordError(!password ? "Password is required." : passwordError);
      setConfirmPasswordError(
        !confirmPassword
          ? "Confirm password is required."
          : confirmPasswordError
      );
      return;
    }

    // Retrieve users from localStorage and parse them correctly
    const storedUsers = localStorage.getItem("user");
    const existingUser = storedUsers ? JSON.parse(storedUsers) : [];

    // Ensure existingUser is an array
    if (!Array.isArray(existingUser)) {
      console.error(
        "Corrupted user data in localStorage. Resetting to empty array."
      );
      localStorage.setItem("user", JSON.stringify([]));
      setEmailError("An error occurred. Please try again.");
      return;
    }

    // Check if the email already exists
    const isEmailUnique = existingUser.some((user) => user.email === email);
    if (isEmailUnique) {
      setEmailError("User already exists.");
      return;
    }

    const newUser = { email, password };
    existingUser.push(newUser);
    localStorage.setItem("user", JSON.stringify(existingUser));

    setUserCreated(true);
    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullnameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setTimeout(() => {
      handleLoginPage();
      setUserCreated(false);
    }, 1500);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="signup-form-container" onSubmit={handleSubmit}>
      <h2 className="signup-header">Sign Up</h2>
      <label className="signup-label-Fname">Full Name</label>
      <input
        className="signup-input-Fname"
        placeholder="Full Name"
        id="fullname"
        type="text"
        value={fullname}
        onChange={handleFullname}
      />

      <label className="signup-label-email">Email</label>
      <input
        className="signup-input-email"
        placeholder="Email"
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <label className="signup-label-password">Password</label>
      <div className="signup-pwd-sh-input">
        <input
          className="signup-input-password"
          placeholder="Password"
          id="password"
          type={showCreatePassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="signup-pwd-sh-icon" onClick={handleShowCreatePassword}>
          <Icon icon={showCreatePassword ? eyeOff : eye} />
        </span>
      </div>
      <label className="signup-label-password">Confirm Password</label>
      <div className="signup-pwd-sh-input">
        <input
          className="signup-input-password"
          placeholder="Confirm Password"
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <span
          className="signup-pwd-sh-icon"
          onClick={handleConfirmShowPassword}
        >
          <Icon icon={showConfirmPassword ? eyeOff : eye} />
        </span>
      </div>

      <button
        className="signup-button"
        type="submit"
        disabled={
          !fullname ||
          !email ||
          !password ||
          !confirmPassword ||
          fullnameError ||
          emailError ||
          passwordError ||
          confirmPasswordError
        }
      >
        Create an account
      </button>
      {!emailError && userCreated && (
        <p
          className="signup-confirm-message"
          style={{
            color: "rgb(35, 210, 134)",
          }}
        >
          User created successfully!
        </p>
      )}

      <p className="signup-error1-message">
        {fullnameError || emailError || passwordError || confirmPasswordError}
      </p>
    </form>
  );
};

export default SignUpForm;
