import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiThunk,
  flagChangeButton,
  getFiltereeData,
} from "../../store/apiSlice";
import {
  addToCartButton,
  totalAmountCart,
  totalPrice,
} from "../../store/cartSlice";
import "./home.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();

  const {
    apiStore: { apiData },
  } = useSelector((state) => state);
  console.log(apiData);

  const addToCart = (item) => {
    dispatch(addToCartButton(item));
    dispatch(totalPrice());
    dispatch(totalAmountCart());
  };

  const getAllData = () => {
    dispatch(apiThunk());
  };

  const filterNameData = (category) => {
    console.log(category);
    dispatch(getFiltereeData(category));
  };

  const flagChange = (item) => {
    dispatch(flagChangeButton(item));
  };

  return (
    <div>
      <div className="buttons_for_filter">
        <button onClick={getAllData}>All</button>
        <button onClick={() => filterNameData("women's clothing")}>
          Women's clothing
        </button>
        <button onClick={() => filterNameData("men's clothing")}>
          Men's clothing
        </button>
        <button onClick={() => filterNameData("jewelery")}>Jewelery</button>
        <button onClick={() => filterNameData("electronics")}>
          Electronics
        </button>
      </div>

      <div className="home_container">
        {apiData?.map((item) => {
          return (
            <div className="productbox" key={item.id}>
              <div className="idfmage">
                <img src={item.image} alt="" />
              </div>

              <div className="heart">
                {item.heartFlag ? (
                  <AiFillHeart
                    size={30}
                    color="red"
                    cursor="pointer"
                    onClick={() => flagChange(item)}
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    color="red"
                    cursor="pointer"
                    onClick={() => flagChange(item)}
                  />
                )}
              </div>

              <h3>{item.title}</h3>

              <div className="demo">
                <h4>price : ₹ {item.price}</h4>
                <h4>Rating : {item.rating.rate}⭐</h4>
              </div>

              <p>
                <b>stock</b> : {item.rating.count}
              </p>

              <p>
                <b>category</b> : {item.category}
              </p>

              <div className="btn">
                <button onClick={() => addToCart(item)}>Add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
