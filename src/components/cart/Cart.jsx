import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementAmount,
  deleteCartData,
  deleteIdButton,
  incrementAmount,
  totalAmountCart,
  totalPrice,
} from "../../store/cartSlice";
import "./cart.css";
import swal from "sweetalert";

const Cart = () => {
  const dispatch = useDispatch();

  const {
    cartStore: { cartData, total },
  } = useSelector((state) => state);

  const deleteData = (id) => {
    dispatch(deleteIdButton(id));
    dispatch(totalPrice());
    dispatch(totalAmountCart());
  };

  const decrement = (item) => {
    dispatch(decrementAmount(item));
    // console.log(item.amount);
    if (item.amount === 1) {
      dispatch(deleteIdButton(item.id));
    }
    dispatch(totalPrice());
    dispatch(totalAmountCart());
  };

  const increment = (item) => {
    dispatch(incrementAmount(item));
    dispatch(totalPrice());
    dispatch(totalAmountCart());
  };

  const orderPlaced = () => {
    // swal("Congrats !, Your Order Placed", "success");
    swal("Congrats ", "Your Order Placed", "success");
    dispatch(deleteCartData());
    console.log(cartData);
    dispatch(totalPrice());
    dispatch(totalAmountCart());
  };

  return (
    <div className="cart_main">
      <Link to="/">
        <div className="back_button">
          <button>Back</button>
        </div>
      </Link>
      {cartData?.map((item) => {
        return (
          <div className="card_body" key={item?.id}>
            <div className="image">
              <img src={item?.image} alt="cart_image_404" />
            </div>

            <div className="name">
              <p>{item?.title}</p>
            </div>

            <div className="price">
              {/* <h2>${item?.price} /-</h2> */}
              <h2>${item?.price.toFixed(0)} /-</h2>
            </div>

            <div className="add_minus">
              <button onClick={() => decrement(item)}>-</button>
              <h2>{item?.amount}</h2>
              <button onClick={() => increment(item)}>+</button>
            </div>

            <div className="price">
              <h2>${Math.trunc(item.amount * item.price)}</h2>
            </div>

            <div className="delete">
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <hr style={{ marginTop: "20px" }} />
        <h1 style={{ textAlign: "center" }}>TOTAL : ${Math.trunc(total)}</h1>

        {/* <button style={{ backgroundColor: "#dfa432",  }}>Place Order</button> */}
        <Link to="/">
          <button
            style={{
              backgroundColor: "#dfa432",
              color: "white",
              border: "none",
              fontSize: "20px",
              padding: "13px 20px",
              borderRadius: "27px",
              // margin: "20px 0px 0px 35px",
              cursor: "pointer",
            }}
            onClick={orderPlaced}
          >
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
