import React from "react";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import DarkMode from "./components/DarkMode/DarkMode";
import LogUser from "./pages/LogUser/LogUser";
import { Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./redux/ProtectedRoute";
import { setValidLoginUser } from "./redux/loginSlice";
import Loading from "./components/Items/Loading/Loading";
import Main from "./components/Main/Main";
import MobilePage from "./pages/ProductPage/Products/MobilePage/MobilePage";
import TabletsPage from "./pages/ProductPage/Products/TabletsPage/TabletsPage";
import LaptopsPage from "./pages/ProductPage/Products/LaptopsPage/LaptopsPage";
import CamerasPage from "./pages/ProductPage/Products/CamerasPage/CamerasPage";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus === "true") {
      dispatch(setValidLoginUser(true));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <DarkMode />
      <Routes>
        <Route path="/login" element={<LogUser />} />
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Header />
              <Main />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mobiles"
          exact
          element={
            <ProtectedRoute>
              <MobilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tablets"
          exact
          element={
            <ProtectedRoute>
              <TabletsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/laptops"
          exact
          element={
            <ProtectedRoute>
              <LaptopsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cameras"
          exact
          element={
            <ProtectedRoute>
              <CamerasPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Fragment>
  );
}

export default App;
