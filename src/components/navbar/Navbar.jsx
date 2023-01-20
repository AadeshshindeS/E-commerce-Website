import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiThunk, searchButton } from "../../store/apiSlice";
import "./navbar.css";

const Navbar = () => {
  const [filterName, setFilterName] = useState("");
  const dispatch = useDispatch();
  const {
    cartStore: { cartData, totalAmount },
  } = useSelector((state) => state);
  const inputHandler = (e) => {
    setFilterName(e.target.value);
  };

  const searchByCategory = () => {
    dispatch(searchButton(filterName));
  };

  const showExistingData = () => {
    dispatch(apiThunk());
  };

  return (
    <div className="navbar_main">
      <div className="logo" onClick={showExistingData}>
        <Link to="/">
          <img
            src="https://img.freepik.com/premium-vector/dslr-camera-logo-design-illustration_317408-107.jpg"
            alt="navbar_img_404"
          />
        </Link>
      </div>

      <div className="search_box">
        <input
          type="text"
          placeholder="enter category"
          onChange={inputHandler}
          value={filterName}
        />
        <button onClick={searchByCategory}>Search</button>
      </div>

      <Link to="/cart">
        <div className="cart">
          {/* <h1>{cartData.length}</h1> */}
          <h1>{totalAmount}</h1>
          <h1>🛒</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
