import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "../../styles/styleComponents/DarkMode/DarkMode.css";
import { useDispatch } from "react-redux";
import { setDarkTheme } from "../../redux/DarkThemeSlice";

const DarkMode = () => {
  const dispatch = useDispatch();
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
    dispatch(setDarkTheme(selectedTheme === "dark" ? true : false));
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
      dispatch(setDarkTheme(true));
    } else setLightMode();
  };
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setDarkMode();
      dispatch(setDarkTheme(true));
    } else {
      setLightMode();
      dispatch(setDarkTheme(false));
    }
  }, [dispatch]);
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
