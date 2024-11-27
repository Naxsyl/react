import { Fragment } from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPrice";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const { isDarkMode } = useContext(DarkMode);
  const dispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        if (product) {
          return acc + product.price * item.qty;
        }
        return acc;
      }, 0);

      dispatch({
        type: "UPDATE",
        payload: {
          total: sum,
        },
      });

      // setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart, products]);

  return (
    <Fragment>
      <table
        className={`text-left table-auto border-separate border-spacing-x-5 ${
          isDarkMode && "text-white"
        }`}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.id
              );
              if (!product) return null;
              return (
                <tr key={item.id}>
                  <td>{product.title.substring(0, 20)}...</td>
                  <td>
                    {product.price.toLocaleString("en-us", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{item.qty}</td>
                  <td>
                    {(item.qty * product.price).toLocaleString("en-us", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              );
            })}
          <tr ref={totalPriceRef}>
            <td colSpan={3}>
              <b>Total Price</b>
            </td>
            <td>
              {total.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default TableCart;
