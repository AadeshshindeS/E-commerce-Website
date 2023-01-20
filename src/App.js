import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { apiThunk } from "./store/apiSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";

const App = () => {
  const dispatch = useDispatch();
  const {
    apiStore: {
      apiData: { products },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(apiThunk());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
