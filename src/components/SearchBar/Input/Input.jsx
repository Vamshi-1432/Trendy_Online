import React, { useState } from "react";
import "../../../styles/styleComponents/SearchBar/Input/input.css";
import { useDispatch } from "react-redux";
import { setSearchItem, setShowResults } from "../../../redux/searchSlice";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  // Handle input changes
  const handleInputValues = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      dispatch(setShowResults(true));
    } else {
      dispatch(setShowResults(false));
    }
  };

  // Handle the search action
  const handleSearchInput = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      dispatch(setSearchItem(inputValue));
    }
  };

  // Clear input and hide results
  const handleClearInput = () => {
    setInputValue("");
    dispatch(setShowResults(false));
  };

  return (
    <form className="input-outer-container" onSubmit={handleSearchInput}>
      <div className="input-container">
        <input
          type="search"
          placeholder="Search Here"
          className="input-box"
          value={inputValue}
          onChange={handleInputValues}
        />
        <div className="input-buttons">
          <button
            type="submit"
            onClick={handleSearchInput}
            disabled={inputValue.length < 1}
          >
            <ion-icon name="search-outline" />
          </button>
          <button
            type="button"
            onClick={handleClearInput}
            disabled={inputValue.length < 1}
          >
            <ion-icon name="close-circle-outline" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
