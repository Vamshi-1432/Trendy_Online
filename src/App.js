import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setValidLoginUser } from "./redux/loginSlice";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DarkMode from "./components/DarkMode/DarkMode";
import LogUser from "./pages/LogUser/LogUser";
import Loading from "./components/Items/Loading/Loading";
import Main from "./components/Main/Main";
import MobilePage from "./pages/ProductPage/Products/MobilePage/MobilePage";
import TabletsPage from "./pages/ProductPage/Products/TabletsPage/TabletsPage";
import LaptopsPage from "./pages/ProductPage/Products/LaptopsPage/LaptopsPage";
import CamerasPage from "./pages/ProductPage/Products/CamerasPage/CamerasPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.validLoginUser);
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
          element={
            isAuthenticated ? (
              <>
                <Header />
                <Main />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/mobiles"
          element={
            isAuthenticated ? <MobilePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tablets"
          element={
            isAuthenticated ? <TabletsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/laptops"
          element={
            isAuthenticated ? <LaptopsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/cameras"
          element={
            isAuthenticated ? <CamerasPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
    </Fragment>
  );
}

export default App;
